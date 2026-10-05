"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { BookButton } from "@/components/BookButton";
import { Icon } from "@/lib/icons";

/** Sticky table of contents with scroll-spy. Plain anchors work without JS. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  if (items.length === 0) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <b>On this page</b>
      {items.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={h.id === active ? "on" : undefined}
          aria-current={h.id === active ? "location" : undefined}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

/** Small navy booking card used in page asides. */
export function BookCard() {
  return (
    <div className="book-card">
      <b>Ready to see Dr. James?</b>
      <p>Book by WhatsApp, phone or the form. {site.hoursShort}.</p>
      <div className="row">
        <BookButton label="Book" />
        <a className="btn ghost-dark" href={site.phoneTel}>
          <Icon name="phone" size={16} /> Call
        </a>
      </div>
    </div>
  );
}
