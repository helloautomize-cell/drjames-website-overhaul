"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { Icon } from "@/lib/icons";

/** Client-side condition search for the 404 page. */
export function ConditionSearch() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return allConditions.slice(0, 6);
    return allConditions.filter(
      (c) =>
        c.title.toLowerCase().includes(t) ||
        c.short.toLowerCase().includes(t) ||
        c.line.toLowerCase().includes(t),
    );
  }, [q]);

  return (
    <div className="csearch">
      <label htmlFor="cs-q" className="sr-only">
        Search conditions
      </label>
      <input
        id="cs-q"
        type="search"
        placeholder="Search a condition, e.g. diabetes or sleep"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="cond-chips" role="list">
        {hits.length ? (
          hits.map((c) => (
            <Link key={c.slug} href={conditionUrl(c.slug)} role="listitem">
              {c.title}
            </Link>
          ))
        ) : (
          <span className="no-hit">
            <Icon name="info" size={16} /> No match. Try the{" "}
            <Link href="/conditions/">full conditions list</Link>.
          </span>
        )}
      </div>
    </div>
  );
}
