"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import {
  parseBookingForm,
  buildBookingEmail,
  muscatNow,
  BOOKING_INBOX,
  type FieldError,
} from "@/lib/booking";

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
