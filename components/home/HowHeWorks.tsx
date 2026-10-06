"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { site } from "@/lib/site-config";
import { Confirm } from "@/components/Confirm";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/Badge";
import type { BadgeName } from "@/lib/badge-glyphs";

const ROMAN = ["i", "ii", "iii", "iv"];
const PRINCIPLES: { badge: BadgeName; title: string; line: string; means: string }[] = [
  {
    badge: "listens",
    title: "Listens first",
    line: "Time for your story, your history and your questions before any test is ordered.",
    means: "What it means for you: you are heard before you are tested.",
  },
  {
    badge: "together",
    title: "Looks at it all together",
    line: "Sugar, pressure, kidneys, heart and medicines, read as one picture and one plan.",
    means: "What it means for you: one doctor, one plan.",
  },
  {
    badge: "tests-reason",
    title: "Tests with a reason",
    line: "Only the tests your situation needs, explained before they are done.",
    means: "What it means for you: no wasted tests.",
  },
  {
    badge: "plain-words",
    title: "Explains in plain words",
    line: "A written plan you understand, reviewed at every visit as things change.",
    means: "What it means for you: you leave knowing what to do.",
  },
];

const QUOTE: { w: string; acc?: boolean }[] = [
  "Every", "patient", "deserves", "not", "only", "the", "right", "treatment", "but", "also",
  "the", "right",
].map((w) => ({ w }));
QUOTE.push({ w: "understanding", acc: true });
QUOTE.push(...["of", "their", "health."].map((w) => ({ w })));

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/**
 * Cinematic navy band: consultation photo fills the left, quote lights up word
 * by word on scroll, four principle cards overlap the bottom edge.
 */
export function HowHeWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(subscribeRM, () => matchMedia(RM).matches, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.classList.add("on");
      el.querySelectorAll(".fw").forEach((w) => w.classList.add("on"));
      return;
    }
    const words = [...el.querySelectorAll<HTMLElement>(".fw")];
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (el.classList.add("on"), io.disconnect()),
      { threshold: 0.2 },
    );
    io.observe(el);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.82 - r.top) / (r.height * 0.8)));
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle("on", i < n));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <>
      <section className="hw2" aria-labelledby="hw-h" ref={ref} data-header="dark">
        <div className="hw2-photo" aria-hidden="true">
          <Image
            src="/images/doctor/d03-consultation-1800w.jpg"
            alt=""
            width={1800}
            height={1200}
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </div>
        <span className="hw2-cap">
          <i className="lc-dot" aria-hidden="true" />
          In clinic · Badr Al Samaa Royal Hospital
        </span>
        <div className="container hw2-grid">
          <div aria-hidden="true" />
          <div className="hw2-q">
            <span className="eyebrow">How Dr. James works</span>
            <span className="qm" aria-hidden="true">
              &ldquo;
            </span>
            <h2 id="hw-h" className="sr-only">
              How Dr. James works
            </h2>
            <p
              className="qt"
              aria-label="Every patient deserves not only the right treatment but also the right understanding of their health."
            >
              {QUOTE.map((w, i) => (
                <span key={i} className={`fw${w.acc ? " acc" : ""}`} aria-hidden="true">
                  {w.w}{" "}
                </span>
              ))}
            </p>
            <div className="by2">
              <b>Dr. James Kumar Pallivathukkal</b>
              <span>Head of Internal Medicine · in his own words</span>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <Reveal as="div" className="prin3" threshold={0.2}>
          {PRINCIPLES.map((p, i) => (
            <Link className="pc" href={site.profileUrl} key={p.title}>
              <span className="rn" aria-hidden="true">
                {ROMAN[i]}
              </span>
              <Badge name={p.badge} />
              <h3>{p.title}</h3>
              <p>{p.line}</p>
              <span className="pm2">
                {p.means} <Confirm />
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </>
  );
}
