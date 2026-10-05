"use client";

import { useEffect, useRef } from "react";

/**
 * 2px gold reading-progress line pinned under the header capsule.
 * Width tracks scroll through #gd-body; CSS hides it under
 * prefers-reduced-motion entirely.
 */
export function GuideProgress({ target = "gd-body" }: { target?: string }) {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = document.getElementById(target);
    const b = bar.current;
    if (!el || !b) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight * 0.4);
      const done = Math.min(1, Math.max(0, -r.top / total));
      b.style.transform = `scaleX(${done})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span className="gd-progress" aria-hidden="true">
      <span ref={bar} />
    </span>
  );
}
