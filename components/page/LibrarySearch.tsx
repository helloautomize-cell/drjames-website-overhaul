"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live search over the server-rendered guide cards: while a query is active
 * the cluster layout is hidden and matching guides show as a plain card
 * grid; clearing the search restores the cluster view. "/" focuses the
 * field; Enter jumps to the results. Without JS the input is inert and the
 * full cluster layout stays visible.
 */
export function LibrarySearch() {
  const ref = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const needle = q.trim().toLowerCase();
    const clusters = document.getElementById("hl-clusters");
    const results = document.getElementById("hl-results");
    if (!clusters || !results) return;
    let shown = 0;
    results.querySelectorAll<HTMLElement>("[data-q]").forEach((c) => {
      const match = !needle || (c.dataset.q ?? "").includes(needle);
      c.hidden = !match;
      if (match) shown++;
    });
    clusters.hidden = !!needle;
    results.hidden = !needle;
    const empty = document.getElementById("hl-empty");
    if (empty) empty.hidden = !(needle && shown === 0);
  }, [q]);

  return (
    <form
      className="hl-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("hl-results")?.scrollIntoView({ block: "start" });
      }}
    >
      <span className="hl-search-ic" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M16.5 16.5L21 21" />
        </svg>
      </span>
      <input
        ref={ref}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search guides"
        aria-label="Search guides"
        aria-controls="hl-results"
      />
      <kbd aria-hidden="true">/</kbd>
    </form>
  );
}
