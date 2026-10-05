"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live search over the server-rendered guide list: filters .hl-row elements
 * on their data-q haystack, reveals the empty state, and hides pagination
 * while a query is active. "/" focuses the field; Enter jumps to the list.
 * Without JS the input is inert and every first-page row stays visible.
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
    const rows = document.querySelectorAll<HTMLElement>(".hl-row");
    let shown = 0;
    rows.forEach((r) => {
      const match = !needle || (r.dataset.q ?? "").includes(needle);
      const paged = !needle && r.hasAttribute("data-extra");
      r.hidden = !match || paged;
      if (!r.hidden) shown++;
    });
    const empty = document.getElementById("hl-empty");
    if (empty) empty.hidden = !(needle && shown === 0);
    const more = document.getElementById("hl-more");
    if (more) more.hidden = !!needle;
  }, [q]);

  return (
    <form
      className="hl-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("hl-list")?.scrollIntoView({ block: "start" });
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
        aria-controls="hl-list"
      />
      <kbd aria-hidden="true">/</kbd>
    </form>
  );
}
