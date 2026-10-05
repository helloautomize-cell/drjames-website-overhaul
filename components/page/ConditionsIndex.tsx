"use client";

import { useEffect, useState } from "react";
import { useFinder } from "@/components/site/SymptomFinder";
import { site } from "@/lib/site-config";

const CHIPS: { label: string; q: string }[] = [
  { label: "High sugar report", q: "high sugar" },
  { label: "Breathless", q: "breath" },
  { label: "Always tired", q: "tired" },
  { label: "High BP", q: "blood pressure" },
  { label: "Joint pain", q: "joint" },
];

/** Search-looking button and "Often searched" chips. Both hand off to the symptom finder. */
export function ConditionsSearch() {
  const { openFinder } = useFinder();
  return (
    <>
      <button type="button" className="cx-search" onClick={() => openFinder("")}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span>Search a condition or symptom</span>
        <kbd aria-hidden="true">/</kbd>
      </button>
      <div className="cx-chips">
        <span id="cx-often">Often searched</span>
        <ul aria-labelledby="cx-often">
          {CHIPS.map((c) => (
            <li key={c.label}>
              <button type="button" onClick={() => openFinder(c.q)}>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** Opens the finder from the closing band. */
export function FinderButton({ children }: { children: React.ReactNode }) {
  const { openFinder } = useFinder();
  return (
    <button type="button" className="cx-btn cx-btn-p" onClick={() => openFinder("")}>
      {children}
    </button>
  );
}

/** Sticky group index with scroll-spy; horizontal chip bar below 1100px. */
export function GroupIndex({ groups }: { groups: { id: string; label: string; count: number }[] }) {
  const [active, setActive] = useState(groups[0]?.id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id.replace(/^g-/, ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    groups.forEach((g) => {
      const el = document.getElementById(`g-${g.id}`);
      if (el) io.observe(el.closest("section") ?? el);
    });
    return () => io.disconnect();
  }, [groups]);

  return (
    <aside className="cx-side">
      <nav className="cx-index" aria-label="Condition groups">
        {groups.map((g) => (
          <a
            key={g.id}
            href={`#g-${g.id}`}
            className={g.id === active ? "on" : undefined}
            aria-current={g.id === active ? "true" : undefined}
          >
            <span>{g.label}</span>
            <small>{g.count}</small>
          </a>
        ))}
      </nav>
      <div className="cx-emerg">
        <span>Emergency?</span>
        <a href={`tel:${site.emergency}`}>Call {site.emergency}</a>
      </div>
    </aside>
  );
}
