"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(REDUCED);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia(REDUCED).matches,
    () => false,
  );
}

/**
 * Auto-moving overflow row (master prompt carousel rules):
 * advances one card every 4.5s and loops, pauses on hover, focus, touch,
 * wheel and a hidden tab, resumes 6s after interaction, exposes a WCAG 2.2.2
 * pause button and a progress bar, and stays still under reduced motion.
 * `mobileOnly` restricts the motion to viewports under 768px.
 */
export function AutoRow({
  id,
  className,
  mobileOnly = false,
  children,
}: {
  id: string;
  className?: string;
  mobileOnly?: boolean;
  children: ReactNode;
}) {
  const row = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const hold = useRef(false);
  const paused = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = row.current;
    if (!el) return;

    let resume: ReturnType<typeof setTimeout>;
    const release = () => {
      hold.current = true;
      clearTimeout(resume);
      resume = setTimeout(() => {
        hold.current = false;
      }, 6000);
    };
    const update = () => {
      if (!bar.current) return;
      const max = el.scrollWidth - el.clientWidth;
      bar.current.style.width = `${max > 0 ? Math.min(100, (el.scrollLeft / max) * 100) : 100}%`;
    };
    const step = () => {
      const card = el.children[0] as HTMLElement | undefined;
      if (!card) return;
      const w = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).gap || "0");
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({
        left: el.scrollLeft + w > max + 2 ? 0 : el.scrollLeft + w,
        behavior: "smooth",
      });
    };
    const tick = setInterval(() => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const active =
        !reduce &&
        !paused.current &&
        !hold.current &&
        !document.hidden &&
        (!mobileOnly || window.innerWidth < 768);
      if (active) step();
    }, 4500);

    for (const ev of ["pointerenter", "focusin", "touchstart", "wheel"] as const) {
      el.addEventListener(ev, release, { passive: true });
    }
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      clearInterval(tick);
      clearTimeout(resume);
      for (const ev of ["pointerenter", "focusin", "touchstart", "wheel"] as const) {
        el.removeEventListener(ev, release);
      }
      el.removeEventListener("scroll", update);
    };
  }, [mobileOnly]);

  const toggle = () => {
    paused.current = !paused.current;
    setIsPaused(paused.current);
  };

  return (
    <>
      <div id={id} ref={row} className={className} data-autoplay>
        {children}
      </div>
      <div className={`ctrl${mobileOnly ? " mobile-only" : ""}`} data-for={id}>
        <button
          className="pp"
          type="button"
          hidden={reduced}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={isPaused}
          onClick={toggle}
        >
          {isPaused ? "▶" : "❚❚"}
        </button>
        <span className="prog">
          <i ref={bar} />
        </span>
      </div>
    </>
  );
}
