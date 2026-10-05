import { z } from "zod";
import { site } from "@/lib/site-config";

/**
 * Appointment request validation and email assembly.
 * Server-side single source — the form mirrors these rules natively
 * where possible, but this module is the authority.
 */

export const BOOKING_REASONS = [
  "New consultation",
  "Follow-up",
  "Check-up",
  "Second opinion",
  "Medicines review",
  "Other",
] as const;

export type BookingReason = (typeof BOOKING_REASONS)[number];

/** Exact consent sentence, reused verbatim in the form and the email record. */
export const CONSENT_TEXT =
  "I agree that Dr. James's team may contact me about this appointment, as described in the privacy policy.";

export const GUARDIAN_TEXT =
  "I consent to my child seeing Dr. James and to being contacted about this appointment.";

export const NO_MEDICAL_NOTE =
  "Please do not include medical details here. Dr. James will ask about your health at your visit.";

export const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 24 * 60 * 60 * 1000;

export interface BookingValues {
  patientName: string;
  mobile: string;
  age: string;
  ageUnit: "Years" | "Months";
  reason: BookingReason;
  prefDate: string;
  timeOfDay: string;
  under18: boolean;
  guardianName: string;
  sourcePage: string;
}

export type FieldError = { field: string; message: string };

/**
 * Normalise a mobile number. Oman mobiles are 8 digits after +968;
 * international numbers with an explicit country code are accepted
 * for visiting patients. Returns a display form or null.
 */
export function normaliseMobile(raw: string): string | null {
  const t = raw.replace(/[\s\-().]/g, "");
  if (!t) return null;
  if (/^\+?968\d{8}$/.test(t) || /^00968\d{8}$/.test(t)) {
    return `+968 ${t.slice(-8)}`;
  }
  if (/^\d{8}$/.test(t)) return `+968 ${t}`;
  if (/^\+?\d{6,15}$/.test(t)) return t.startsWith("+") ? t : `+${t}`;
  return null;
}

export function ageInYears(age: number, unit: "Years" | "Months"): number {
  return unit === "Months" ? age / 12 : age;
}

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

export interface ParsedBooking {
  values: BookingValues;
  errors: FieldError[];
  /** Honeypot tripped or fill time outside limits — treat as spam silently. */
  spam: boolean;
  turnstileToken: string;
}

export function parseBookingForm(fd: FormData): ParsedBooking {
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

/** Today's date at midnight UTC as seen in Muscat (UTC+4). */
function muscatTodayUtc(): number {
  const now = new Date();
  const muscat = new Date(now.getTime() + 4 * 3600000 + now.getTimezoneOffset() * 60000);
  return Date.UTC(muscat.getUTCFullYear(), muscat.getUTCMonth(), muscat.getUTCDate());
}

export function muscatNow(): string {
  return new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Muscat",
    dateStyle: "full",
    timeStyle: "short",
  });
}

/** min/max for the native date input (Muscat-local, today to +60 days). */
export function dateLimits(): { min: string; max: string } {
  const fmt = (t: number) => new Date(t).toISOString().slice(0, 10);
  const today = muscatTodayUtc();
  return { min: fmt(today), max: fmt(today + 60 * 86400000) };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Plain-text + HTML email for the clinic inbox. No health data beyond the neutral reason. */
export function buildBookingEmail(
  v: BookingValues & { consentAt: string },
  receivedAt: string,
): { subject: string; text: string; html: string } {
  const tel = `tel:${v.mobile.replace(/\s/g, "")}`;
  const wa = `https://wa.me/${v.mobile.replace(/\D/g, "")}`;
  const subject = `Appointment request: ${v.patientName} (${v.reason})`;
  const rows: [string, string][] = [
    ["Patient name", v.patientName],
    ["Mobile", v.mobile],
    ["Age", `${v.age} ${v.ageUnit}`],
    ["Reason", v.reason],
    ["Preferred date", v.prefDate || "Not specified"],
    ["Time of day", v.timeOfDay],
    ...(v.under18 ? ([["Under 18", "Yes"], ["Guardian", v.guardianName]] as [string, string][]) : []),
    ["Source page", v.sourcePage],
    ["Consent text", CONSENT_TEXT],
    ["Consent given at", `${v.consentAt} (Muscat time)`],
    ["Received", `${receivedAt} (Muscat time)`],
  ];
  const text =
    `Appointment request from drjamesp.com\n\n` +
    rows.map(([k, val]) => `${k}: ${val}`).join("\n") +
    `\n\nCall: ${tel}\nWhatsApp: ${wa}\n`;
  const html = `<h2 style="font-family:sans-serif">Appointment request</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
${rows
  .map(
    ([k, val]) =>
      `<tr><td style="border:1px solid #ddd;padding:6px 10px;color:#555">${esc(k)}</td><td style="border:1px solid #ddd;padding:6px 10px">${esc(val)}</td></tr>`,
  )
  .join("")}
</table>
<p style="font-family:sans-serif">
<a href="${esc(tel)}">Call ${esc(v.mobile)}</a> &middot;
<a href="${esc(wa)}">Reply on WhatsApp</a></p>`;
  return { subject, text, html };
}

/** Destination inbox for requests (single source in site-config). */
export const BOOKING_INBOX = site.email;
