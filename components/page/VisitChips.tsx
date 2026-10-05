"use client";

import { useEffect, useState } from "react";

export type VisitChip = { id: string; label: string };

/**
 * On-this-page chip row. Sticks below the header once reached; the chip
 * for the section in view is highlighted (scroll-spy). Plain anchors, so
 * navigation still works without JavaScript.
 */
export function VisitChips({ items }: { items: VisitChip[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) setActive(en.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="yv-chips" aria-label="On this page">
      <ul>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a className={id === active ? "on" : ""} href={`#${id}`}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
