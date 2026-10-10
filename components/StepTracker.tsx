"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Confirm } from "@/components/Confirm";

const STEPS: [string, ReactNode, { src: string; alt: string }?][] = [
  [
    "Book",
    <>
      WhatsApp or call +968 9751 0975. Appointments only, we confirm your time by
      message. <Confirm>Reply time to be confirmed</Confirm>
    </>,
  ],
  [
    "Arrive and register",
    "Come to the hospital in Al Ghubrah. Bring old prescriptions, reports and the medicines you take, and your sugar diary or meter if you have diabetes.",
    {
      src: "/images/doctor/d07-welcome-4x5-1000w.jpg",
      alt: "Dr. James welcoming patients at the hospital reception",
    },
  ],
  [
    "Consultation",
    "Dr. James listens, asks about your history and examines you. There is time for your questions.",
    {
      src: "/images/doctor/d03-consultation-4x5-1000w.jpg",
      alt: "Dr. James explaining a care plan to a patient during a consultation",
    },
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
    const vis = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          vis.set(en.target, en.isIntersecting ? en.intersectionRatio : 0);
        }
        let best: Element | null = null;
        let bv = 0;
        vis.forEach((r, t) => {
          if (r > bv) {
            bv = r;
            best = t;
          }
        });
        if (best) setCur(Number((best as HTMLElement).dataset.i));
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      },
    );
    el.querySelectorAll(".step").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="tracker">
      <div className="trk-side">
        <div className="trk-swap" key={cur}>
          <div className="trk-num">{String(cur + 1).padStart(2, "0")}</div>
          <div className="trk-lab">{STEPS[cur][0]}</div>
        </div>
        <div className="rail" aria-hidden="true">
          {STEPS.map((_, i) => (
            <i key={i} className={i < cur ? "done" : i === cur ? "now" : ""} />
          ))}
        </div>
      </div>
      <div ref={stepsRef}>
        {STEPS.map(([title, body, img], i) => (
          <div
            key={title}
            className={`step${i === cur ? " on" : ""}`}
            data-i={i}
            tabIndex={0}
            onClick={() => setCur(i)}
            onKeyDown={(e) => e.key === "Enter" && setCur(i)}
            data-done={i < cur || undefined}
          >
            <h3>{title}</h3>
            <p>{body}</p>
            {img ? (
              <span className="step-img" aria-hidden="false">
                <Image src={img.src} alt={img.alt} width={1000} height={1250} sizes="(max-width: 900px) 100vw, 380px" />
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
