"use client";

import Link from "next/link";
import { useState } from "react";

export const BOOK_REASONS = [
  "New consultation",
  "Follow-up",
  "Check-up",
  "Second opinion",
  "Other",
] as const;

/**
 * Appointment request form. Phase 3 ships the accessible shell and
 * validation surface; the Server Action, Resend email and Turnstile
 * spam check arrive in Phase 5. Fields intentionally carry no `name`
 * attributes until then, so nothing is transmitted or stored.
 */
export function BookingForm({ defaultReason }: { defaultReason?: string }) {
  const [under18, setUnder18] = useState(false);
  return (
    <form className="bform" id="book" noValidate onSubmit={(e) => e.preventDefault()}>
      <div className="f">
        <label htmlFor="b-name">Patient name</label>
        <input id="b-name" autoComplete="name" placeholder="Full name" required />
      </div>
      <div className="f">
        <label htmlFor="b-mob">Mobile number</label>
        <div className="pre">
          <span>+968</span>
          <input id="b-mob" inputMode="tel" autoComplete="tel" placeholder="9XXX XXXX" required />
        </div>
      </div>
      <div className="f half">
        <label htmlFor="b-age">Age</label>
        <div className="pre">
          <input id="b-age" inputMode="numeric" placeholder="45" required />
          <select id="b-ageu" aria-label="Age unit">
            <option>Years</option>
            <option>Months</option>
          </select>
        </div>
      </div>
      <div className="f half">
        <label htmlFor="b-reason">Reason for visit</label>
        <select id="b-reason" defaultValue={defaultReason ?? BOOK_REASONS[0]}>
          {BOOK_REASONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="f half">
        <label htmlFor="b-date">Preferred date</label>
        <input id="b-date" type="date" />
      </div>
      <div className="f half">
        <label htmlFor="b-time">Time of day</label>
        <select id="b-time">
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </div>
      <label className="chk" htmlFor="b-u18">
        <input
          type="checkbox"
          id="b-u18"
          checked={under18}
          onChange={(e) => setUnder18(e.target.checked)}
        />{" "}
        The patient is under 18 (a parent or guardian must fill this form)
      </label>
      {under18 ? (
        <div className="f">
          <label htmlFor="b-guardian">Parent or guardian name</label>
          <input id="b-guardian" autoComplete="off" placeholder="Guardian full name" />
          <small className="fnote">
            I consent to my child seeing Dr. James and to being contacted about this
            appointment.
          </small>
        </div>
      ) : null}
      <label className="chk" htmlFor="b-consent">
        <input type="checkbox" id="b-consent" required /> I agree that Dr. James&apos;s team
        may contact me about this appointment, as described in the{" "}
        <Link href="/privacy-policy/">privacy policy</Link>.
      </label>
      <p className="fnote">
        Please do not include medical details here. Dr. James will ask about your health at
        your visit.
      </p>
      <button className="btn btn-p" type="submit">
        Request appointment
      </button>
    </form>
  );
}
