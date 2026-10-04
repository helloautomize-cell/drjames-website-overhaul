"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Badge } from "@/components/Badge";
import { Icon, type IconName } from "@/lib/icons";
import { site } from "@/lib/site-config";

const COVERS = [
  "radial-gradient(90% 120% at 100% 0%,rgba(201,164,106,.45),transparent),linear-gradient(135deg,#DCEDEE,#F2F8F8)",
  "radial-gradient(90% 120% at 0% 0%,rgba(14,47,82,.22),transparent),linear-gradient(135deg,#F2F8F8,#DCEDEE)",
  "radial-gradient(90% 120% at 100% 100%,rgba(201,164,106,.40),transparent),linear-gradient(135deg,#F2F8F8,#FBF7F0)",
];

export type LibraryArticle = {
  slug: string;
  icon: IconName;
  cat: string;
  title: string;
  meta: ReactNode;
  blurb: string;
};

/** Centred Health Library carousel: side cards fade and tilt; drag, dots and arrows. */
export function LibraryCarousel({ articles }: { articles: LibraryArticle[] }) {
  const car = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(
    () =>
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const sx = useRef<number | null>(null);
  const hover = useRef(false);
  const n = articles.length;

  const go = useCallback(
    (k: number) => {
      const c = car.current;
      const t = track.current;
      if (!c || !t || n === 0) return;
      const next = ((k % n) + n) % n;
      const cards = t.children;
      const card = cards[0] as HTMLElement | undefined;
      if (!card) return;
      const cw = card.offsetWidth + 24;
      const off = c.offsetWidth / 2 - card.offsetWidth / 2 - next * cw;
      t.style.transform = `translateX(${off}px)`;
      setCur(next);
    },
    [n],
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => go(n > 1 ? 1 : 0));
    const onResize = () => go(cur);
    window.addEventListener("resize", onResize);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer =
      reduce || n < 2
        ? null
        : setInterval(() => {
            if (!hover.current && !paused && !document.hidden) go(cur + 1);
          }, 4500);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      if (timer) clearInterval(timer);
    };
  }, [cur, go, n, paused]);

  return (
    <>
      <div
        className="car"
        ref={car}
        onPointerEnter={() => (hover.current = true)}
        onPointerLeave={() => (hover.current = false)}
        onPointerDown={(e) => (sx.current = e.clientX)}
        onPointerUp={(e) => {
          if (sx.current !== null && Math.abs(e.clientX - sx.current) > 40) {
            go(cur + (e.clientX < sx.current ? 1 : -1));
          }
          sx.current = null;
        }}
      >
        <div className="track" ref={track}>
          {articles.map((a, i) => (
            <article key={a.slug} className={`cc${i === cur ? " on" : ""}`}>
              <Link href={`${site.libraryUrl}${a.slug}/`} className="cc-link">
                <div className="cover" style={{ background: COVERS[i % COVERS.length] }}>
                  <Badge icon={a.icon} size={96} />
                </div>
                <div className="cb">
                  <span className="cat">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <div className="meta">{a.meta}</div>
                  <p>{a.blurb}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <div className="carnav">
        <button className="arr" type="button" aria-label="Previous" onClick={() => go(cur - 1)}>
          <Icon name="arrowLeft" size={20} strokeWidth={2} />
        </button>
        <div className="dots">
          {articles.map((a, i) => (
            <button
              key={a.slug}
              type="button"
              className={i === cur ? "on" : ""}
              aria-label={`Card ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button className="arr" type="button" aria-label="Next" onClick={() => go(cur + 1)}>
          <Icon name="arrow" size={20} strokeWidth={2} />
        </button>
        <button
          className="pp"
          type="button"
          hidden={reduced}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "▶" : "❚❚"}
        </button>
      </div>
    </>
  );
}
