"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { site } from "@/lib/site-config";
import { CONTOURS } from "@/lib/contours";
import { Star8 } from "@/components/site/Star8";

const PILLARS: { name: string; line: string; focus: [number, number] }[] = [
  {
    name: "Diabetes and metabolic health",
    line: "From a first high sugar report to steady long-term control, with weight, cholesterol and thyroid in the same plan.",
    focus: [24, 24],
  },
  {
    name: "Complex adult medicine",
    line: "Several conditions at once, unclear symptoms, and medicines that need to work together.",
    focus: [78, 20],
  },
  {
    name: "Preventive care",
    line: "Check-ups planned around your own risks after a consultation, so no test is wasted.",
    focus: [22, 74],
  },
  {
    name: "Critical care experience",
    line: "Years of leading intensive care and COVID‑19 operations across three hospitals.",
    focus: [74, 70],
  },
];
const DUR = 5200;
const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Portrait panel (contour field, glow, cutout, name plate) and the "whole picture" pillar card. */
export function HeroVisual() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeRM, () => matchMedia(RM).matches, () => false);
  const [run, setRun] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [focusPx, setFocusPx] = useState<[number, number] | null>(null);

  // % focus points resolved to px so the glow can move with transform
  // (layout-affecting left/top transitions would count as CLS).
  useEffect(() => {
    const p = panelRef.current;
    if (!p) return;
    const update = () =>
      setFocusPx([
        (p.clientWidth * PILLARS[cur].focus[0]) / 100,
        (p.clientHeight * PILLARS[cur].focus[1]) / 100,
      ]);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(p);
    return () => ro.disconnect();
  }, [cur]);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % PILLARS.length), DUR);
    return () => clearTimeout(t);
  }, [cur, paused, reduced, run]);

  const pause = () => setPaused(true);
  const resume = () => {
    setPaused(false);
    setRun((r) => r + 1);
  };
  const [fx, fy] = PILLARS[cur].focus;

  return (
    <div className="x-vis">
      <div ref={panelRef} className="x-panel x-in" style={{ animationDelay: ".2s" }}>
        <svg className="x-contours" viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {CONTOURS.map((c) => (
            <path key={c.delay} pathLength={1} d={c.d} style={{ animationDelay: `${c.delay + 0.9}s` }} />
          ))}
        </svg>
        <div
          className="x-focus"
          style={
            focusPx
              ? { ["--fpx" as string]: `${focusPx[0]}px`, ["--fpy" as string]: `${focusPx[1]}px` }
              : { ["--fpx" as string]: `${(440 * fx) / 100}px`, ["--fpy" as string]: `${(440 * fy) / 100}px` }
          }
          aria-hidden="true"
        />
        <div className="x-plate">
          <div className="x-s">
            <Star8 />
          </div>
          <b>{site.name}</b>
          <span>Head of Internal Medicine and Head of Quality, {site.hospital}</span>
        </div>
        <div className="x-por">
          <Image
            src="/images/doctor/dr-james-hero.png"
            alt="Dr. James Kumar Pallivathukkal in a white coat with a stethoscope, arms folded"
            width={419}
            height={716}
            priority
            sizes="(max-width: 759px) 70vw, 420px"
          />
        </div>
      </div>
      <div
        ref={cardRef}
        className={`x-pill x-in${paused ? " x-paused" : ""}`}
        style={{ animationDelay: ".5s" }}
        role="group"
        aria-label="The whole picture: four areas of care"
        onMouseEnter={pause}
        onMouseLeave={() => {
          if (!cardRef.current?.contains(document.activeElement)) resume();
        }}
        onFocus={pause}
        onBlur={(e) => {
          if (!cardRef.current?.contains(e.relatedTarget as Node)) resume();
        }}
      >
        <header>
          <b>The whole picture</b>
          <span>Four areas, one physician</span>
        </header>
        <div>
          {PILLARS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className="x-prow"
              aria-expanded={reduced ? i === 0 : i === cur}
              onClick={() => setCur(i)}
            >
              <i>0{i + 1}</i>
              <b>{p.name}</b>
              <span className="x-d">
                <span>{p.line}</span>
              </span>
              {reduced ? null : <span className="x-t" key={`${i}-${i === cur ? run : 0}-${cur}`} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
