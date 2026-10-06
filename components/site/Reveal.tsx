"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * IntersectionObserver gate: adds `.on` once the element scrolls into view,
 * driving CSS draw-in transitions. Children stay server-rendered.
 */
export function Reveal({
  as: Tag = "div",
  className,
  threshold = 0.35,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  threshold?: number;
  children?: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      el?.classList.add("on");
      return;
    }
    let done = false;
    const on = () => {
      if (done) return;
      done = true;
      el.classList.add("on");
      io.disconnect();
      window.removeEventListener("scroll", check);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) on();
      },
      { threshold },
    );
    /* content-visibility:auto can skip IO delivery on fast scrolls — fall back
       to a plain geometry check so children never stay hidden. */
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * (1 - threshold / 2) && r.bottom > 0) on();
    };
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
    };
  }, [threshold]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
