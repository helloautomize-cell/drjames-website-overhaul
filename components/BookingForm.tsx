"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { requestAppointment, type BookingState } from "@/app/actions/booking";
import { Turnstile } from "@/components/Turnstile";
import {
  BOOKING_REASONS,
  CONSENT_TEXT,
  GUARDIAN_TEXT,
  NO_MEDICAL_NOTE,
  dateLimits,
} from "@/lib/booking";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";

const FIELD_ID: Record<string, string> = {
  patient_name: "b-name",
  mobile: "b-mob",
  age: "b-age",
  pref_date: "b-date",
  under18: "b-u18",
  guardian_name: "b-guardian",
  consent: "b-consent",
  turnstile: "book",
  submit: "book",
};

export const BOOK_REASONS = BOOKING_REASONS;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-p" type="submit" disabled={pending}>
      {pending ? "Sending…" : "Request appointment"}
    </button>
  );
}

/**
 * Appointment request form (7.3). Server Action end to end, works
 * without JavaScript (progressive enhancement): native validation
 * first, server re-validates and re-renders with an error summary.
 * The guardian row is always in the HTML, revealed by :has().
 */
export function BookingForm({
  defaultReason,
  sourcePage = "/contact/",
}: {
  defaultReason?: string;
  sourcePage?: string;
}) {
  const [state, action] = useActionState<BookingState | null, FormData>(
    requestAppointment,
    null,
  );
  const errors = state?.errors ?? [];
  const fatal = state?.fatal === true;
  const v = state?.values ?? {};
  const errRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (errors.length > 0) errRef.current?.focus();
  }, [errors.length]);

  useEffect(() => {
    // Fresh timestamps/limits on mount — SSG markup must not bake them.
    if (startedRef.current) startedRef.current.value = String(Date.now());
    if (dateRef.current) {
      const { min, max } = dateLimits();
      dateRef.current.min = min;
      dateRef.current.max = max;
    }
  }, []);

  return (
    <form className="bform" id="book" action={action}>
      {errors.length > 0 ? (
        <div className="bform-errors" role="alert" tabIndex={-1} ref={errRef}>
          <b>{fatal ? "We could not send your request" : "Please check the form"}</b>
          <ul>
            {errors.map((e) => (
              <li key={e.field}>
                <a href={`#${FIELD_ID[e.field] ?? "book"}`}>{e.message}</a>
              </li>
            ))}
          </ul>
          {fatal ? (
            <div className="btns">
              <a className="btn btn-s" href={site.phoneTel}>
                <Icon name="phone" size={17} /> Call {site.phoneDisplay}
              </a>
              <a
                className="btn wa-btn"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          ) : null}
        </div>
      ) : null}

      <input type="hidden" name="source_page" value={sourcePage} />
      <input type="hidden" name="form_started" ref={startedRef} defaultValue="" />
      <div className="hp" aria-hidden="true">
        <label htmlFor="b-website">Website</label>
        <input id="b-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="f">
        <label htmlFor="b-name">Patient name</label>
        <input
          id="b-name"
          name="patient_name"
          autoComplete="name"
          placeholder="Full name"
          required
          defaultValue={v.patientName}
        />
      </div>
      <div className="f">
        <label htmlFor="b-mob">Mobile number</label>
        <div className="pre">
          <span>+968</span>
          <input
            id="b-mob"
            name="mobile"
            inputMode="tel"
            autoComplete="tel"
            placeholder="9XXX XXXX"
            required
            defaultValue={v.mobile}
          />
        </div>
        <small className="fnote">Visiting Oman? Include your country code instead.</small>
      </div>
      <div className="f half">
        <label htmlFor="b-age">Age</label>
        <div className="pre">
          <input
            id="b-age"
            name="age"
            inputMode="numeric"
            placeholder="45"
            required
            defaultValue={v.age}
          />
          <select id="b-ageu" name="age_unit" aria-label="Age unit" defaultValue={v.ageUnit}>
            <option>Years</option>
            <option>Months</option>
          </select>
        </div>
      </div>
      <div className="f half">
        <label htmlFor="b-reason">Reason for visit</label>
        <select id="b-reason" name="reason" defaultValue={v.reason ?? defaultReason}>
          {BOOKING_REASONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="f half">
        <label htmlFor="b-date">Preferred date</label>
        <input id="b-date" name="pref_date" type="date" ref={dateRef} defaultValue={v.prefDate} />
        <small className="fnote">
          {site.hoursClosed}
        </small>
      </div>
      <div className="f half">
        <label htmlFor="b-time">Time of day</label>
        <select id="b-time" name="time_of_day" defaultValue={v.timeOfDay}>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </div>
      <label className="chk" htmlFor="b-u18">
        <input type="checkbox" id="b-u18" name="under18" defaultChecked={v.under18 === "on"} />
        <span>The patient is under 18 (a parent or guardian must fill this form)</span>
      </label>
      <div className="f g-block">
        <label htmlFor="b-guardian">Parent or guardian name</label>
        <input
          id="b-guardian"
          name="guardian_name"
          autoComplete="off"
          placeholder="Guardian full name"
          defaultValue={v.guardianName}
        />
        <small className="fnote">{GUARDIAN_TEXT}</small>
      </div>
      <label className="chk" htmlFor="b-consent">
        <input
          type="checkbox"
          id="b-consent"
          name="consent"
          required
          defaultChecked={v.consent === "on"}
        />
        <span>
          {CONSENT_TEXT.replace("privacy policy.", "")}
          <Link href="/privacy-policy/">privacy policy</Link>.
        </span>
      </label>
      <p className="fnote">{NO_MEDICAL_NOTE}</p>
      <Turnstile />
      <SubmitButton />
      <p className="em-line">
        Medical emergency? Call {site.emergency}
      </p>
    </form>
  );
}
