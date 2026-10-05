"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * "In this guide" contents with scroll-spy (numbered, italic gold numerals,
 * petrol bar on the active item). Plain anchors so it works without JS.
 * `children` renders under the list (the condition card).
 */
export function GuideToc({
  items,
  children,
}: {
  items: { id: string; text: string }[];
  children?: ReactNode;
}) {
  const [active, setActive] = useState<string>(items[0]?.id);

  useEffect(() => {
    // Last heading whose top has passed the 35% line wins — rect reads, not
    // IntersectionObserver, so instant scroll jumps can't skip an update.
    let raf = 0;
    const sync = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = items[0]?.id;
      for (const h of items) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav className="gd-toc" aria-label="In this guide">
      <b>In this guide</b>
      <ol>
        {items.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={h.id === active ? "on" : undefined}
              aria-current={h.id === active ? "location" : undefined}
            >
              <i aria-hidden="true">{i + 1}</i>
              <span>{h.text}</span>
            </a>
          </li>
        ))}
      </ol>
      {children}
    </nav>
  );
}
