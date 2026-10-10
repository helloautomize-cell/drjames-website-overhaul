"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";
import {
  buildBookingEmail,
  muscatNow,
  muscatTodayUtc,
  normaliseMobile,
  ageInYears,
  BOOKING_INBOX,
  BOOKING_REASONS,
  MIN_FILL_MS,
  type BookingReason,
  type BookingValues,
  type FieldError,
} from "@/lib/booking";

const MAX_FILL_MS = 24 * 60 * 60 * 1000;

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

interface ParsedBooking {
  values: BookingValues;
  errors: FieldError[];
  /** Honeypot tripped or fill time outside limits — treat as spam silently. */
  spam: boolean;
  turnstileToken: string;
}

function parseBookingForm(fd: FormData): ParsedBooking {
  const values: BookingValues = {
    patientName: str(fd.get("patient_name")),
    mobile: str(fd.get("mobile")),
    age: str(fd.get("age")),
    ageUnit: str(fd.get("age_unit")) === "Months" ? "Months" : "Years",
    reason: BOOKING_REASONS.includes(str(fd.get("reason")) as BookingReason)
      ? (str(fd.get("reason")) as BookingReason)
      : "New consultation",
    prefDate: str(fd.get("pref_date")),
    timeOfDay: ["Morning", "Afternoon", "Evening"].includes(str(fd.get("time_of_day")))
      ? str(fd.get("time_of_day"))
      : "Morning",
    under18: fd.get("under18") === "on",
    guardianName: str(fd.get("guardian_name")),
    sourcePage: str(fd.get("source_page")).startsWith("/")
      ? str(fd.get("source_page")).slice(0, 120)
      : "/contact/",
  };

  const errors: FieldError[] = [];
  const push = (field: string, message: string) => errors.push({ field, message });

  // Zod field schemas — cross-field rules (under-18, date window,
  // consent) are checked below where the messages live.
  const nameS = z.string().trim().min(2).max(80);
  const ageS = z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .refine((n) => {
      const v = Number(n);
      return v >= 0 && v <= 150;
    });
  const dateS = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

  const honeypot = str(fd.get("website"));
  // No-JS submissions have no timestamp — the check only applies when
  // the field is present (honeypot and Turnstile still guard the rest).
  const startedRaw = str(fd.get("form_started"));
  const started = Number(startedRaw);
  const elapsed = Number.isFinite(started) ? Date.now() - started : NaN;
  const spam =
    honeypot !== "" ||
    (startedRaw !== "" &&
      (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS));

  if (!nameS.safeParse(values.patientName).success) {
    push("patient_name", "Enter the patient's full name.");
  }
  const mobile = normaliseMobile(values.mobile);
  if (!mobile) {
    push("mobile", "Enter a mobile number, for example +968 9XXX XXXX.");
  }
  const age = Number(values.age);
  if (!ageS.safeParse(values.age).success) {
    push("age", "Enter the patient's age.");
  } else if (values.ageUnit === "Months" && age > 36) {
    push("age", "For age over 36 months, choose Years.");
  }
  if (values.prefDate) {
    if (!dateS.safeParse(values.prefDate).success) {
      push("pref_date", "Choose a date.");
    } else {
      const [y, m, d] = values.prefDate.split("-").map(Number);
      const day = Date.UTC(y, m - 1, d);
      const muscatToday = muscatTodayUtc();
      const max = muscatToday + 60 * 86400000;
      if (day < muscatToday || day > max) {
        push("pref_date", "Choose a date within the next 60 days.");
      }
    }
  }
  if (ageInYears(Number(values.age) || 0, values.ageUnit) < 18) {
    if (!values.under18) {
      push("under18", "The patient is under 18, so a parent or guardian must fill this form.");
    }
    if (values.guardianName.length < 2) {
      push("guardian_name", "Enter the parent or guardian's name.");
    }
  }
  if (fd.get("consent") !== "on") {
    push("consent", "Please tick the consent box so we can reply about the appointment.");
  }

  return {
    values: { ...values, mobile: mobile ?? values.mobile },
    errors,
    spam,
    turnstileToken: str(fd.get("cf-turnstile-response")),
  };
}

export interface BookingState {
  ok: boolean;
  errors?: FieldError[];
  fatal?: boolean;
  values?: Record<string, string>;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.RESEND_FROM || "bookings@drjamesp.com";
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true;
  try {
    const body = new URLSearchParams({ secret: TURNSTILE_SECRET, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

function flatten(values: object, fd: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(values)) {
    if (typeof v === "string") out[k] = v;
    if (typeof v === "boolean") out[k] = v ? "on" : "";
  }
  out.consent = fd.get("consent") === "on" ? "on" : "";
  return out;
}

export async function requestAppointment(
  _prev: BookingState | null,
  formData: FormData,
): Promise<BookingState> {
  const parsed = parseBookingForm(formData);

  // Honeypot or impossible fill time: pretend success, send nothing.
  if (parsed.spam) redirect("/thank-you/");

  if (parsed.errors.length > 0) {
    return { ok: false, errors: parsed.errors, values: flatten(parsed.values, formData) };
  }

  if (TURNSTILE_SECRET && !(await verifyTurnstile(parsed.turnstileToken, null))) {
    return {
      ok: false,
      fatal: true,
      errors: [{ field: "turnstile", message: "The security check failed. Please try again." }],
      values: flatten(parsed.values, formData),
    };
  }

  const receivedAt = muscatNow();
  const mail = buildBookingEmail(
    { ...parsed.values, consentAt: receivedAt },
    receivedAt,
  );

  if (!resend) {
    // No keys configured (local dev): log the request instead of sending.
    console.warn("[booking] RESEND_API_KEY not set, request not emailed.\n" + mail.text);
  } else {
    try {
      const { error } = await resend.emails.send({
        from: `Dr. James website <${FROM}>`,
        to: [BOOKING_INBOX],
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      });
      if (error) {
        console.error("[booking] resend error", error);
        return {
          ok: false,
          fatal: true,
          errors: [
            {
              field: "submit",
              message: "The request could not be sent. Please book by phone or WhatsApp instead.",
            },
          ],
          values: flatten(parsed.values, formData),
        };
      }
    } catch (err) {
      console.error("[booking] send failed", err);
      return {
        ok: false,
        fatal: true,
        errors: [
          {
            field: "submit",
            message: "The request could not be sent. Please book by phone or WhatsApp instead.",
          },
        ],
        values: flatten(parsed.values, formData),
      };
    }
  }

  redirect("/thank-you/");
}
