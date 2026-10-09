"use client";

import Link from "next/link";
import { useFinder } from "@/components/site/SymptomFinder";

const ROWS: { stmt: string; line: string; href?: string; finder?: boolean }[] = [
  {
    stmt: "You have diabetes, and something else.",
    line: "Blood pressure, cholesterol, kidneys or weight, looked after in the same plan.",
    href: "/conditions/diabetes-and-prediabetes/",
  },
  {
    stmt: "Your reports show several numbers that are a little high.",
    line: "Borderline sugar, cholesterol, liver or kidney values, read together rather than one by one.",
    href: "/conditions/preventive-check-ups/",
  },
  {
    stmt: "You take five or more medicines.",
    line: "A review so your medicines work together, with nothing doubled up and nothing missed.",
    href: "/contact/?reason=medicines-review",
  },
  {
    stmt: "You feel unwell, and the cause is not clear yet.",
    line: "Tiredness, weight change, fevers or breathlessness, worked through step by step.",
    finder: true,
  },
  {
    stmt: "You want a check-up planned around your own risks.",
    line: "Chosen after a consultation, based on your history, so no test is wasted.",
    href: "/conditions/preventive-check-ups/",
  },
  {
    stmt: "You look after a parent with several conditions.",
    line: "One physician who sees the whole picture, and a clear plan the family can follow.",
    href: "/conditions/care-for-older-adults/",
  },
];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
const Arrow = () => (
  <svg className="ar2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** "Is this the right doctor for you?" — six patient-fit rows. */
export function RightDoctor() {
  const { openFinder } = useFinder();
  return (
    <section className="sec" aria-labelledby="rd-h">
      <div className="container">
        <div className="fit">
          <div>
            <span className="eyebrow">Who he sees</span>
            <h2 id="rd-h">
              Is this the right doctor for <em className="acc">you</em>?
            </h2>
            <p className="fit-sub">
              If any of these sound like you, a specialist internist is a good place to start.
            </p>
          </div>
          <div>
            <ul className="fit-list">
              {ROWS.map((r) => {
                const inner = (
                  <>
                    <span className="ck">
                      <Check />
                    </span>
                    <span className="fit-tx">
                      <b>{r.stmt}</b>
                      <span>{r.line}</span>
                    </span>
                    <Arrow />
                  </>
                );
                return (
                  <li key={r.stmt}>
                    {r.finder ? (
                      <button type="button" className="fit-row" onClick={openFinder}>
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
