"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Confirm } from "@/components/Confirm";

const STEPS: [string, ReactNode][] = [
  [
    "Book",
    <>
      WhatsApp or call +968 9751 0975, or use the form. We confirm your time by
      message. Reply time: <Confirm />
    </>,
  ],
  [
    "Arrive and register",
    "Come to the hospital in Al Ghubrah. Bring old prescriptions, reports and the medicines you take, and your sugar diary or meter if you have diabetes.",
  ],
  [
    "Consultation",
    "Dr. James listens, asks about your history and examines you. There is time for your questions.",
  ],
  [
    "Tests if needed",
    "Dr. James decides the right tests after examining you. Blood tests, ECG and scans are done at the hospital.",
  ],
  [
    "Your plan",
    "Results explained in plain words, with a written plan for medicines, food, activity and your next visit.",
  ],
  ["Follow-up", "Return for review as planned, with any new reports."],
];

/** Scroll-tracked visit steps; active step follows scroll or click. */
export function StepTracker() {
  const [cur, setCur] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const en of entries) {
          if (en.isIntersecting && (!best || en.intersectionRatio > best.intersectionRatio)) {
            best = en;
          }
        }
        if (best) setCur(Number((best.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    el.querySelectorAll(".step").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="tracker">
      <div className="trk-side">
        <div className="trk-num">{String(cur + 1).padStart(2, "0")}</div>
        <div className="trk-lab">{STEPS[cur][0]}</div>
        <div className="rail" aria-hidden="true">
          {STEPS.map((_, i) => (
            <i key={i} className={i < cur ? "done" : i === cur ? "now" : ""} />
          ))}
        </div>
      </div>
      <div ref={stepsRef}>
        {STEPS.map(([title, body], i) => (
          <div
            key={title}
            className={`step${i === cur ? " on" : ""}`}
            data-i={i}
            tabIndex={0}
            onClick={() => setCur(i)}
            onKeyDown={(e) => e.key === "Enter" && setCur(i)}
          >
            <small>{String(i + 1).padStart(2, "0")}</small>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
