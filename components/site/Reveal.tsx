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
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("on");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
