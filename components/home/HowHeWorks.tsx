"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Confirm } from "@/components/Confirm";

const ROMAN = ["i", "ii", "iii", "iv"];
const PRINCIPLES: { title: string; line: string }[] = [
  {
    title: "Listens first",
    line: "Time for your story, your history and your questions before any test is ordered.",
  },
  {
    title: "Looks at it all together",
    line: "Sugar, pressure, kidneys, heart and medicines, read as one picture and one plan.",
  },
  {
    title: "Tests with a reason",
    line: "Only the tests your situation needs, explained before they are done.",
  },
  {
    title: "Explains in plain words",
    line: "A written plan you understand, reviewed at every visit as things change.",
  },
];

/** Desk photo + his own words + four practice principles with a draw-in rule. */
export function HowHeWorks() {
  const prin = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = prin.current;
    if (!el || !("IntersectionObserver" in window)) {
      el?.classList.add("on");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("on");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec hw-sec" aria-labelledby="hw-h">
      <div className="container">
        <div className="hw-grid">
          <figure className="hw-photo">
            <Image
              src="/images/clinic/dr-james-consultation.jpg"
              alt="Dr. James at his desk during a consultation at Badr Al Samaa Royal Hospital"
              width={900}
              height={1125}
              sizes="(max-width: 1100px) 92vw, 34vw"
            />
            <figcaption className="hw-cap">In clinic, Badr Al Samaa Royal Hospital</figcaption>
          </figure>
          <div className="hw-copy">
            <span className="eyebrow">How Dr. James works</span>
            <h2 id="hw-h" className="sr-only">
              How Dr. James works
            </h2>
            <blockquote className="hw-quote">
              <span className="hw-mark" aria-hidden="true">
                &ldquo;
              </span>
              Every patient deserves not only the right treatment but also the right{" "}
              <em>understanding</em> of their health.
            </blockquote>
            <div className="hw-sig">
              <span className="hw-rule" aria-hidden="true" />
              <span>
                <b>Dr. James Kumar Pallivathukkal</b>
                <span>in his own words</span>
              </span>
            </div>
          </div>
        </div>
        <ol className="hw-prin" ref={prin}>
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} style={{ ["--d" as string]: `${i * 150}ms` }}>
              <span className="hw-dia" aria-hidden="true" />
              <span className="hw-num">{ROMAN[i]}</span>
              <h3>{p.title}</h3>
              <p>{p.line}</p>
            </li>
          ))}
        </ol>
        {process.env.NEXT_PUBLIC_SHOW_CONFIRM !== "0" ? (
          <p className="hw-confirm">
            <Confirm>[CONFIRM: Dr. James approves the four principles in his own words]</Confirm>
          </p>
        ) : null}
      </div>
    </section>
  );
}
