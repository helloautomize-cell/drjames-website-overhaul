"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/Badge";
import { Icon, type IconName } from "@/lib/icons";

const COVERS = [
  "radial-gradient(90% 120% at 100% 0%,rgba(201,164,106,.45),transparent),linear-gradient(135deg,#DCEDEE,#F2F8F8)",
  "radial-gradient(90% 120% at 0% 0%,rgba(14,47,82,.22),transparent),linear-gradient(135deg,#F2F8F8,#DCEDEE)",
  "radial-gradient(90% 120% at 100% 100%,rgba(201,164,106,.40),transparent),linear-gradient(135deg,#F2F8F8,#FBF7F0)",
];

const ARTICLES: { icon: IconName; cat: string; title: string; meta: string; p: string }[] = [
  {
    icon: "heart",
    cat: "Heart health",
    title: "Early warning signs of heart disease",
    meta: "30 Aug 2019 · 4 min read",
    p: "Chest discomfort, breathlessness, a racing heart or tiredness can be early signs. Know when to get checked.",
  },
  {
    icon: "sleep",
    cat: "Sleep",
    title: "Sleep disorders and your health",
    meta: "30 Aug 2019 · 4 min read",
    p: "Snoring, waking at night and daytime tiredness are worth a doctor's look. Sleep affects sugar, blood pressure and mood.",
  },
  {
    icon: "gut",
    cat: "Digestion",
    title: "Common digestive problems and gut health",
    meta: "20 Aug 2019 · 4 min read",
    p: "Acidity, bloating and bowel changes are common. Simple habits help, and some signs need a doctor.",
  },
];

/** Centred Health Library carousel: side cards fade and tilt; drag, dots and arrows. */
export function LibraryCarousel() {
  const car = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const sx = useRef<number | null>(null);
  const hover = useRef(false);

  const go = useCallback((n: number) => {
    const c = car.current;
    const t = track.current;
    if (!c || !t) return;
    const next = (n + ARTICLES.length) % ARTICLES.length;
    const cards = t.children;
    const card = cards[0] as HTMLElement | undefined;
    if (!card) return;
    const cw = card.offsetWidth + 24;
    const off = c.offsetWidth / 2 - card.offsetWidth / 2 - next * cw;
    t.style.transform = `translateX(${off}px)`;
    setCur(next);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => go(1));
    const onResize = () => go(cur);
    window.addEventListener("resize", onResize);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = reduce
      ? null
      : setInterval(() => {
          if (!hover.current && !document.hidden) go(cur + 1);
        }, 4500);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      if (timer) clearInterval(timer);
    };
  }, [cur, go]);

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
          {ARTICLES.map((a, i) => (
            <article
              key={a.title}
              className={`cc${i === cur ? " on" : ""}`}
              onClick={() => go(i)}
            >
              <div className="cover" style={{ background: COVERS[i] }}>
                <Badge icon={a.icon} size={96} />
              </div>
              <div className="cb">
                <span className="cat">{a.cat}</span>
                <h3>{a.title}</h3>
                <div className="meta">Written by Dr. James · {a.meta}</div>
                <p>{a.p}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="carnav">
        <button className="arr" type="button" aria-label="Previous" onClick={() => go(cur - 1)}>
          <Icon name="arrowLeft" size={20} strokeWidth={2} />
        </button>
        <div className="dots">
          {ARTICLES.map((_, i) => (
            <button
              key={i}
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
      </div>
    </>
  );
}
