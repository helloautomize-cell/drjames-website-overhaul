"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";

const STORE_KEY = "visit-checklist";

const PANELS: { title: string; items: string[] }[] = [
  {
    title: "Documents and reports",
    items: [
      "All your medicines, or a clear photo of the boxes",
      "Older lab reports, scans and discharge summaries",
      "Sugar or blood pressure diaries, if you keep them",
      "Insurance card, if you plan to use it",
    ],
  },
  {
    title: "If blood tests may be needed",
    items: [
      "Ask when you book whether to come fasting",
      "Fasting usually means water only for 8 to 12 hours",
      // Wording to be approved by Dr. James.
      "If you take insulin or diabetes tablets, ask before you fast or skip a dose",
    ],
  },
];

/**
 * Tickable "What to bring" list. Ticks persist in localStorage and never
 * leave the browser; the page works without storage (private mode).
 */
export function VisitChecklist() {
  const [ticks, setTicks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring persisted ticks once on mount
      if (raw) setTicks(JSON.parse(raw));
    } catch {
      /* storage unavailable; ticks just stay for the session */
    }
  }, []);

  function toggle(item: string) {
    setTicks((prev) => {
      const next = { ...prev, [item]: !prev[item] };
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function sendToWhatsApp() {
    const lines = PANELS.flatMap((p) => p.items);
    const text = [
      "What to bring to Dr. James (Badr Al Samaa Royal Hospital):",
      ...lines.map((l) => `- ${l}`),
    ].join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="yv-bring">
      <div className="yv-bring-head">
        <button type="button" className="cx-btn cx-btn-o" onClick={sendToWhatsApp}>
          <Icon name="whatsapp" size={18} /> Send this list to my WhatsApp
        </button>
        <button type="button" className="yv-print" onClick={() => window.print()}>
          Print
        </button>
      </div>
      <div className="yv-panels">
        {PANELS.map((p, pi) => (
          <section key={p.title} className="yv-panel" aria-label={p.title}>
            <h3>{p.title}</h3>
            <ul>
              {p.items.map((item, ii) => {
                const id = `b-${pi}-${ii}`;
                const checked = !!ticks[item];
                return (
                  <li key={item}>
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(item)}
                    />
                    <label htmlFor={id}>{item}</label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="yv-bring-note">Ticks stay in this browser only.</p>
    </div>
  );
}
