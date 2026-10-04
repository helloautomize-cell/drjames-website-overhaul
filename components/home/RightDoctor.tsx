"use client";

import Link from "next/link";
import { useFinder } from "@/components/site/SymptomFinder";

const ROWS: { stmt: string; line: string; label: string; href?: string; finder?: boolean }[] = [
  {
    stmt: "You have diabetes, and something else.",
    line: "Blood pressure, cholesterol, kidneys or weight, looked after in the same plan.",
    label: "Diabetes and prediabetes",
    href: "/conditions/diabetes-and-prediabetes/",
  },
  {
    stmt: "Your reports show several numbers that are a little high.",
    line: "Borderline sugar, cholesterol, liver or kidney values, read together rather than one by one.",
    label: "Preventive check-ups",
    href: "/conditions/preventive-check-ups/",
  },
  {
    stmt: "You take five or more medicines.",
    line: "A review so your medicines work together, with nothing doubled up and nothing missed.",
    label: "Book a medicines review",
    href: "/contact/?reason=medicines-review",
  },
  {
    stmt: "You feel unwell, and the cause is not clear yet.",
    line: "Tiredness, weight change, fevers or breathlessness, worked through step by step.",
    label: "Describe what you feel",
    finder: true,
  },
  {
    stmt: "You want a check-up planned around your own risks.",
    line: "Chosen after a consultation, based on your history, so no test is wasted.",
    label: "Preventive check-ups",
    href: "/conditions/preventive-check-ups/",
  },
  {
    stmt: "You look after a parent with several conditions.",
    line: "One physician who sees the whole picture, and a clear plan the family can follow.",
    label: "Care for older adults",
    href: "/conditions/care-for-older-adults/",
  },
];

const Arrow = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** "Is this the right doctor for you?" — six patient-fit statements as hairline rows. */
export function RightDoctor() {
  const { openFinder } = useFinder();
  return (
    <section className="sec rd-sec" aria-labelledby="rd-h">
      <div className="container">
        <div className="rd-grid">
          <div className="rd-intro">
            <span className="eyebrow">When to see an internist</span>
            <h2 id="rd-h">
              Is this the right doctor for <em className="acc">you</em>?
            </h2>
            <p className="rd-sub">
              An internist looks after adults whose health has more than one moving part. If one of
              these sounds familiar, you are in the right place.
            </p>
            <p className="rd-note">
              Chest pain, sudden breathlessness or weakness on one side?{" "}
              <b>Call 9999 now.</b>
            </p>
          </div>
          <ol className="rd-list">
            {ROWS.map((r, i) => {
              const inner = (
                <>
                  <span className="rd-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rd-tx">
                    <span className="rd-stmt">{r.stmt}</span>
                    <span className="rd-line">{r.line}</span>
                    <span className="rd-m">
                      <span className="rd-label">{r.label}</span>
                      <span className="rd-go">
                        <Arrow />
                      </span>
                    </span>
                  </span>
                  <span className="rd-end">
                    <span className="rd-label">{r.label}</span>
                    <span className="rd-go">
                      <Arrow />
                    </span>
                  </span>
                </>
              );
              return (
                <li key={r.stmt}>
                  {r.finder ? (
                    <button type="button" className="rd-row" onClick={openFinder}>
                      {inner}
                    </button>
                  ) : (
                    <Link className="rd-row" href={r.href!}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
