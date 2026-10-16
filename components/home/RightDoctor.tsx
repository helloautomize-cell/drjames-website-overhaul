"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useFinder } from "@/components/site/SymptomFinder";
import { site } from "@/lib/site-config";
import { bookingUrl } from "@/lib/booking-context";

const ROWS: { id: string; stmt: string; line: string; href?: string; finder?: boolean }[] = [
  {
    id: "diabetes-plus",
    stmt: "You have diabetes, and something else.",
    line: "Blood pressure, cholesterol, kidneys or weight, looked after in the same plan.",
    href: "/conditions/diabetes-and-prediabetes/",
  },
  {
    id: "report-sheet",
    stmt: "Your reports show several numbers that are a little high.",
    line: "Borderline sugar, cholesterol, liver or kidney values, read together rather than one by one.",
    href: "/conditions/preventive-check-ups/",
  },
  {
    id: "capsule",
    stmt: "You take five or more medicines.",
    line: "A review so your medicines work together, with nothing doubled up and nothing missed.",
    href: "/contact/?reason=medicines-review",
  },
  {
    id: "magnifier",
    stmt: "You feel unwell, and the cause is not clear yet.",
    line: "Tiredness, weight change, fevers or breathlessness, worked through step by step.",
    finder: true,
  },
  {
    id: "pulse",
    stmt: "You want a check-up planned around your own risks.",
    line: "Chosen after a consultation, based on your history, so no test is wasted.",
    href: "/conditions/preventive-check-ups/",
  },
  {
    id: "people",
    stmt: "You look after a parent with several conditions.",
    line: "One internist for all of it, and a clear plan the family can follow.",
    href: "/conditions/care-for-older-adults/",
  },
];

const GLYPHS: Record<string, ReactNode> = {
  "diabetes-plus": (
    <>
      <path d="M12 3c3 4.5 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 3-6.5 6-11z" />
      <path d="M12 11v6M9 14h6" />
    </>
  ),
  "report-sheet": (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  capsule: (
    <>
      <path d="M4.6 12.4l7.8-7.8a4.2 4.2 0 0 1 6 6l-7.8 7.8a4.2 4.2 0 0 1-6-6z" />
      <path d="M8.5 8.5l7 7" />
    </>
  ),
  magnifier: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5L20 20" />
    </>
  ),
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 14.4c3 0 5.5 2.2 5.5 5.6" />
    </>
  ),
};

const Glyph = ({ id }: { id: string }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {GLYPHS[id]}
  </svg>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** "When several conditions overlap." — six patient-fit rows. */
export function RightDoctor() {
  const { openFinder, preloadFinder } = useFinder();
  return (
    <section className="sec" aria-labelledby="rd-h">
      <div className="container">
        <div className="fit">
          <div className="fit-side">
            <span className="eyebrow">The diagnostician who connects it all</span>
            <h2 id="rd-h">
              When several conditions <em className="acc">overlap</em>.
            </h2>
            <p className="fit-sub">
              Diabetes, blood pressure, kidneys and heart risk are treated as one picture, by one doctor.
            </p>
            <div className="fit-plate">
              <b>{site.name}</b>
              <span>
                {site.roleShort}, {site.hospital}, Muscat
              </span>
            </div>
            <Link className="fit-book" href={bookingUrl()}>
              Book a consultation
            </Link>
          </div>
          <div>
            <ul className="fit-list">
              {ROWS.map((r) => {
                const inner = (
                  <>
                    <span className="fit-mark">
                      <Glyph id={r.id} />
                    </span>
                    <span className="fit-tx">
                      <b>{r.stmt}</b>
                      <span>{r.line}</span>
                    </span>
                    <span className="fit-arr">
                      <Arrow />
                    </span>
                  </>
                );
                return (
                  <li key={r.stmt}>
                    {r.finder ? (
                      <button type="button" className="fit-row" onClick={openFinder} onPointerEnter={preloadFinder} onFocus={preloadFinder}>
                        {inner}
                      </button>
                    ) : (
                      <Link className="fit-row" href={r.href!}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
