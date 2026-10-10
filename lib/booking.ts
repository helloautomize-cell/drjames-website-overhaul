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

/** Today's date at midnight UTC as seen in Muscat (UTC+4). */
export function muscatTodayUtc(): number {
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
