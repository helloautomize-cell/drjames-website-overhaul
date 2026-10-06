"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Badge } from "@/components/Badge";
import { Confirm } from "@/components/Confirm";
import type { BadgeName } from "@/lib/badge-glyphs";

const STEPS: { badge: BadgeName; title: string; body: ReactNode; chips?: string[] }[] = [
  {
    badge: "step-book",
    title: "Book",
    body: (
      <>
        WhatsApp or call +968 9751 0975. Appointments only — we confirm your time by message.{" "}
        <Confirm>Reply time to be confirmed</Confirm>
      </>
    ),
    chips: ["WhatsApp", "+968 9751 0975"],
  },
  {
    badge: "step-arrive",
    title: "Arrive and register",
    body: "Come to the hospital in Al Ghubrah. Bring old prescriptions, reports and the medicines you take, and your sugar diary or meter if you have diabetes.",
    chips: ["Old reports", "Medicine list", "Sugar diary"],
  },
  {
    badge: "step-consult",
    title: "Consultation",
    body: "Dr. James listens, asks about your history and examines you. There is time for your questions.",
    chips: ["History", "Examination", "Your questions"],
  },
  {
    badge: "step-tests",
    title: "Tests if needed",
    body: "Dr. James decides the right tests after examining you. Blood tests, ECG and scans are done at the hospital.",
    chips: ["Blood tests", "ECG", "Imaging on site"],
  },
  {
    badge: "step-plan",
    title: "Your plan",
    body: "Results explained in plain words, with a written plan for medicines, food, activity and your next visit.",
    chips: ["Written plan", "Plain words"],
  },
  {
    badge: "step-follow-up",
    title: "Follow-up",
    body: "Return for review as planned, with any new reports.",
    chips: ["Review visit", "New reports"],
  },
];

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const N = STEPS.length;

/**
 * Pinned first-visit journey: the section pins, scroll advances the step —
 * coin badge turns, panel slides, rail fills, numeral changes. The rail is
 * clickable so nobody is forced to scroll. A plain list under reduced motion.
 */
export function FirstVisit() {
  const wrap = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [flip, setFlip] = useState(0);
  const reduced = useSyncExternalStore(subscribeRM, () => matchMedia(RM).matches, () => false);

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    let last = -1;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = el.getBoundingClientRect();
        const tot = el.offsetHeight - window.innerHeight;
        const p = tot > 0 ? Math.min(1, Math.max(0, -r.top / tot)) : 1;
        const i = Math.min(N - 1, Math.floor(p * N));
        el.style.setProperty("--p", String(N > 1 ? i / (N - 1) : 1));
        el.querySelector(".jr-bar")?.setAttribute("style", `--p:${p.toFixed(3)}`);
        if (i !== last) {
          last = i;
          setCur(i);
          setFlip((f) => f + 1);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const jump = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const tot = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (tot * (i + 0.5)) / N;
    window.scrollTo({ top, behavior: matchMedia(RM).matches ? "auto" : "smooth" });
  };

  return (
    <div className="jr" ref={wrap}>
      <div className="jr-stick">
        <div className="container jr-grid">
          <div className="jr-left">
            <span className="eyebrow">Your first visit</span>
            <h2>
              Six calm steps, from <em className="acc">hello</em> to a plan.
            </h2>
            <p className="hint">
              <i aria-hidden="true" />
              Scroll, or tap a step
            </p>
            <ol className="rail2">
              <span className="fill" aria-hidden="true" />
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    className={i < cur ? "done" : ""}
                    aria-current={i === cur ? "step" : undefined}
                    onClick={() => jump(i)}
                  >
                    <span className="n">{i + 1}</span>
                    <span className="lbl">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="jr-stage">
            <span className="jr-num" aria-hidden="true" key={cur}>
              {String(cur + 1).padStart(2, "0")}
            </span>
            <Badge key={`b-${cur}-${flip}`} name={STEPS[cur].badge} size="xl" className={flip ? "flip" : ""} />
            <div>
              {STEPS.map((s, i) => (
                <div key={s.title} className={`jp${i === cur ? " on" : ""}`} aria-hidden={i !== cur}>
                  <span className="kick">
                    Step {i + 1} of {N}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  {s.chips ? (
                    <ul>
                      {s.chips.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="jr-bar" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
