"use client";

import { useEffect, useRef, type ReactNode } from "react";

const DOT_Y = 28;

/**
 * Career timeline list. A gold line grows down the track as the reader scrolls and each
 * dot fills when the line reaches it. Server markup is the finished state (no JS and
 * reduced motion keep it); the scroll listener only runs when motion is allowed.
 */
export function TimelineFill({ children }: { children: ReactNode }) {
  const ol = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ol.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...el.children] as HTMLElement[];
    let ticking = false;
    const run = () => {
      ticking = false;
      const fill = window.innerHeight * 0.62 - el.getBoundingClientRect().top;
      items.forEach((li, i) => {
        const y = li.offsetTop + DOT_Y;
        const next = items[i + 1] ? items[i + 1].offsetTop + DOT_Y : y;
        const f = next > y ? Math.min(1, Math.max(0, (fill - y) / (next - y))) : 0;
        li.style.setProperty("--f", f.toFixed(3));
        li.classList.toggle("hit", fill >= y);
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.fonts?.ready.then(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol className="tl2" ref={ol}>
      {children}
    </ol>
  );
}
