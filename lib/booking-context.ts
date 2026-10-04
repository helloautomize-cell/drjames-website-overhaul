import { BOOKING_REASONS, type BookingReason } from "@/lib/booking";

/**
 * Page-to-reason prefill for the booking form (7.2 single source).
 * The reason list stays neutral per 6.3: condition pages never name
 * a diagnosis, they only choose the closest neutral bucket.
 */

const SLUG_REASON: Record<string, BookingReason> = {
  "preventive-check-ups": "Check-up",
  "heart-risk-assessment": "Check-up",
};

/** Reason to prefill when a visitor taps Book from a page with this slug. */
export function reasonForSlug(slug: string | undefined): BookingReason {
  if (slug && slug in SLUG_REASON) return SLUG_REASON[slug];
  return "New consultation";
}

/** Booking URL carrying the prefilled reason (fragment keeps #book). */
export function bookingUrl(reason?: BookingReason): string {
  const base = "/contact/";
  const r = reason && reason !== "New consultation" ? `?reason=${encodeURIComponent(reason)}` : "";
  return `${base}${r}#book`;
}

const PARAM_ALIAS: Record<string, BookingReason> = {
  "medicines-review": "Medicines review",
};

/** Validate a ?reason= param against the neutral list (kebab aliases allowed). */
export function reasonFromParam(param: string | undefined): BookingReason | undefined {
  if (!param) return undefined;
  if (param in PARAM_ALIAS) return PARAM_ALIAS[param];
  return (BOOKING_REASONS as readonly string[]).includes(param)
    ? (param as BookingReason)
    : undefined;
}
