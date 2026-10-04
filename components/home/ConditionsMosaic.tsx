"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { allConditions, conditionUrl } from "@/lib/conditions";

const N = allConditions.length;

const ic = (children: ReactNode) => (
  <svg
    className="x-ic"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const TILES: { name: string; tag: string; text: string; slug: string; icon: ReactNode }[] = [
  {
    name: "Blood sugar",
    tag: "HbA1c",
    text: "Diabetes, prediabetes, weight",
    slug: "diabetes-and-prediabetes",
    icon: ic(
      <>
        <path d="M12 3c4 5 6 8.5 6 11a6 6 0 0 1-12 0c0-2.5 2-6 6-11Z" />
        <path d="M9.3 14.3a2.8 2.8 0 0 0 2.7 2.8" />
      </>,
    ),
  },
  {
    name: "Heart and blood pressure",
    tag: "BP",
    text: "High blood pressure, cholesterol, heart risk",
    slug: "high-blood-pressure",
    icon: ic(
      <>
        <path d="M12 20s-7.5-4.5-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.5 12 20 12 20Z" />
        <path d="M7 12h2.6l1.4-2.4 2 4.6 1.4-2.2H17" />
      </>,
    ),
  },
  {
    name: "Kidneys",
    tag: "eGFR",
    text: "Kidney problems, kidney protection in diabetes",
    slug: "kidney-problems",
    icon: ic(
      <>
        <path d="M9 4C6 4 4 7.2 4 11.5S6 20 9 20c2 0 3-1.5 3-3.2 0-1.6-1.6-2.7-1.6-4.8S12 9 12 7.3C12 5.5 11 4 9 4Z" />
        <path d="M15 4c3 0 5 3.2 5 7.5S18 20 15 20c-.9 0-1.6-.3-2.1-.8" />
        <path d="M12 12h2" />
      </>,
    ),
  },
  {
    name: "Lungs and breathing",
    tag: "SpO₂",
    text: "Asthma, chest infections, pneumonia",
    slug: "asthma-and-breathing",
    icon: ic(
      <>
        <path d="M12 3.5v8M12 11.5 9.8 13M12 11.5l2.2 1.5" />
        <path d="M9.5 8.5C6.5 8.5 4 13 4 17c0 1.8 1.1 2.8 2.7 2.8 2 0 3.6-1.5 3.6-3.6V9.3" />
        <path d="M14.5 8.5c3 0 5.5 4.5 5.5 8.5 0 1.8-1.1 2.8-2.7 2.8-2 0-3.6-1.5-3.6-3.6V9.3" />
      </>,
    ),
  },
  {
    name: "Liver and gut",
    tag: "ALT",
    text: "Fatty liver, acidity, bowel changes",
    slug: "fatty-liver",
    icon: ic(
      <>
        <path d="M3.5 9.5C3.5 6.8 6 5 9 5h8.5c2 0 3 1.4 3 3 0 3.2-3.5 6-7.5 8-2.6 1.3-5.2 2.5-6.8 2.5-1.6 0-2.7-1.6-2.7-4.5V9.5Z" />
        <path d="M12 5.5c-.4 3-1.8 5.4-4.5 7" />
      </>,
    ),
  },
  {
    name: "Thyroid",
    tag: "TSH",
    text: "Under and overactive thyroid",
    slug: "thyroid-disorders",
    icon: ic(
      <>
        <path d="M12 6.5v11" />
        <path d="M12 9c-.9-2-2.8-3.2-4.8-3.2C5.2 5.8 4 7.8 4 11c0 3.4 1.6 6.2 4.2 6.2 1.9 0 3-1.8 3.8-3.7" />
        <path d="M12 9c.9-2 2.8-3.2 4.8-3.2 2 0 3.2 2 3.2 5.2 0 3.4-1.6 6.2-4.2 6.2-1.9 0-3-1.8-3.8-3.7" />
      </>,
    ),
  },
  {
    name: "Sleep and energy",
    tag: "Hb",
    text: "Sleep apnea, tiredness, anaemia",
    slug: "sleep-apnea",
    icon: ic(
      <>
        <path d="M19.5 14.2A7.8 7.8 0 1 1 9.8 4.5a6.2 6.2 0 0 0 9.7 9.7Z" />
        <path d="M15 3.5h3.5L15 7.5h3.5" />
      </>,
    ),
  },
  {
    name: "Joints and later life",
    tag: "CHECK-UP",
    text: "Joint pain, care for older adults, check-ups",
    slug: "care-for-older-adults",
    icon: ic(
      <>
        <circle cx="12" cy="12" r="2.6" />
        <path d="M6.5 3.5 10.6 9.8M17.5 3.5l-4.1 6.3M10.6 14.2 6.5 20.5M13.4 14.2l4.1 6.3" />
      </>,
    ),
  },
];

const CAPTIONS: ReactNode[] = [
  <>
    Blood sugar, the heart, kidneys, lungs, liver, thyroid, sleep and joints.{" "}
    <b>Any one of them can be the reason you come in.</b>
  </>,
  <>
    They are rarely separate. Diabetes affects the heart and kidneys, sleep apnea can raise blood
    pressure, and the thyroid can shift weight and sugar.
  </>,
  <>
    So Dr. James looks at them <b>together</b>, with one plan that is reviewed over time.
  </>,
];

/** [from, to] tile pairs joined by the gold lines. */
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [1, 2], [0, 4], [5, 0], [6, 1], [3, 6], [7, 1],
];
/** Starting offsets (x, y, rotate) of each tile before it gathers. */
const SCATTER: [number, number, number][] = [
  [-70, -60, -7], [30, -110, 5], [110, -40, -4], [150, -90, 7],
  [-110, 70, 5], [-20, 120, -6], [80, 90, 4], [160, 40, -5],
];

const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => cl((p - a) / (b - a));
const eo = (t: number) => 1 - Math.pow(1 - t, 3);
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * "One system": eight areas gather, gold lines connect them, then they join into one panel.
 * Progress p drives transforms, opacity and two CSS variables from one rAF-throttled listener.
 * Without JS or with reduced motion the joined end state is shown in plain flow.
 */
export function ConditionsMosaic() {
  const cx = useRef<HTMLDivElement>(null);
  const mosaic = useRef<HTMLUListElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const joinp = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLDivElement>(null);
  const steps = useRef<HTMLDivElement>(null);
  const seeAll = useRef<HTMLAnchorElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const cxEl = cx.current!;
    const mos = mosaic.current!;
    const items = [...mos.children] as HTMLElement[];
    const mob = matchMedia("(max-width: 759px)");
    const rm = matchMedia("(prefers-reduced-motion: reduce)");
    let lastStep = -1;
    let ticking = false;

    const render = (p: number) => {
      const a = eo(seg(p, 0, 0.35));
      const l = seg(p, 0.3, 0.58);
      const j = eio(seg(p, 0.6, 0.88));
      const jo = eo(seg(p, 0.86, 1));
      const k = mob.matches ? 0.45 : 1;
      items.forEach((li, i) => {
        const s = SCATTER[i];
        const f = 1 - a;
        li.style.transform = `translate(${s[0] * f * k}px,${s[1] * f * k}px) rotate(${s[2] * f}deg) scale(${0.92 + 0.08 * a})`;
        li.style.opacity = String(0.55 + 0.45 * a);
      });
      mos.style.setProperty("--gap", `${(mob.matches ? 10 : 22) * (1 - j)}px`);
      mos.style.setProperty("--r", `${(mob.matches ? 14 : 18) * (1 - j)}px`);
      mos.style.setProperty("--pb", String(1 - jo));
      mos.style.setProperty("--txt", (1 - 0.6 * Math.min(seg(p, 0.28, 0.36), 1 - seg(p, 0.58, 0.68))).toFixed(3));
      mos.classList.toggle("x-joined", j > 0.98);
      const jp = joinp.current!;
      jp.style.setProperty("--jo", String(jo));
      jp.style.visibility = jo < 0.01 ? "hidden" : "visible";
      const sa = seeAll.current!;
      sa.style.opacity = String(1 - jo);
      sa.style.visibility = jo > 0.98 ? "hidden" : "visible";

      const base = wrap.current!.getBoundingClientRect();
      const pts = items.map((li) => {
        const r = li.querySelector(".x-ic")!.getBoundingClientRect();
        return [r.left + r.width / 2 - base.left, r.top + r.height / 2 - base.top];
      });
      const fade = 1 - seg(p, 0.62, 0.8);
      LINKS.forEach(([x, y], n) => {
        const A = pts[x];
        const B = pts[y];
        const mx = (A[0] + B[0]) / 2;
        const my = (A[1] + B[1]) / 2;
        const dx = B[0] - A[0];
        const dy = B[1] - A[1];
        const bow = 0.18;
        const path = paths.current[n]!;
        path.setAttribute(
          "d",
          `M${A[0].toFixed(1)} ${A[1].toFixed(1)} Q${(mx - dy * bow).toFixed(1)} ${(my + dx * bow).toFixed(1)} ${B[0].toFixed(1)} ${B[1].toFixed(1)}`,
        );
        const ln = cl(l * 1.4 - n * 0.05);
        path.setAttribute("stroke-dashoffset", (1 - ln).toFixed(3));
        path.style.opacity = l > 0 ? String(fade) : "0";
        [A, B].forEach((pt, m) => {
          const d = dots.current[n * 2 + m]!;
          d.setAttribute("cx", pt[0].toFixed(1));
          d.setAttribute("cy", pt[1].toFixed(1));
          d.style.opacity = String((ln > 0 ? 1 : 0) * fade);
        });
      });
      const st = p < 0.3 ? 0 : p < 0.6 ? 1 : 2;
      if (st !== lastStep) {
        lastStep = st;
        [...cap.current!.children].forEach((e, i) => e.classList.toggle("x-on", i === st));
        [...steps.current!.children].forEach((e, i) => e.classList.toggle("x-on", i <= st));
      }
    };
    const progress = () => {
      const r = cxEl.getBoundingClientRect();
      const tot = cxEl.offsetHeight - window.innerHeight;
      return tot > 0 ? cl(-r.top / tot) : 1;
    };
    const frame = () => {
      ticking = false;
      render(rm.matches ? 1 : progress());
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.fonts?.ready.then(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="x-night" id="conditions" aria-labelledby="c-h" data-header="dark">
      <div className="x-cx" ref={cx}>
        <div className="x-stage">
          <div className="container" style={{ width: "100%" }}>
            <div className="x-sgrid">
              <div>
                <div className="eyebrow">Conditions he looks after</div>
                <h2 id="c-h">
                  Your body is one system. Your <em>care</em> should be too.
                </h2>
                <div className="x-steps" ref={steps} aria-hidden="true">
                  <i className="x-on" />
                  <i />
                  <i />
                </div>
                <div className="x-cap" ref={cap} aria-live="off">
                  {CAPTIONS.map((c, i) => (
                    <p key={i} className={i === 0 ? "x-on" : ""}>
                      {c}
                    </p>
                  ))}
                </div>
                <Link className="x-all" href="/conditions/" ref={seeAll}>
                  See all {N} conditions →
                </Link>
              </div>
              <div className="x-mos-wrap" ref={wrap}>
                <ul className="x-mosaic x-joined" ref={mosaic} style={{ ["--gap" as string]: "0px", ["--r" as string]: "0px" }}>
                  {TILES.map((t) => (
                    <li key={t.slug}>
                      <Link className="x-tile" href={conditionUrl(t.slug)}>
                        <span className="x-top">
                          {t.icon}
                          <span className="x-tag">{t.tag}</span>
                        </span>
                        <h3>
                          {t.name}
                          <ArrowIcon />
                        </h3>
                        <p>{t.text}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <svg className="x-links" aria-hidden="true">
                  {LINKS.map((_, n) => (
                    <path
                      key={n}
                      ref={(el) => {
                        paths.current[n] = el;
                      }}
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={1}
                    />
                  ))}
                  {LINKS.flatMap((_, n) => [0, 1].map((m) => (
                    <circle
                      key={`${n}-${m}`}
                      ref={(el) => {
                        dots.current[n * 2 + m] = el;
                      }}
                      r={3.5}
                    />
                  )))}
                </svg>
                <div className="x-joinp" ref={joinp}>
                  <Image src="/images/doctor/dr-james-avatar.jpg" alt="" width={44} height={44} />
                  <b>Looked after together by one specialist internist</b>
                  <Link href="/conditions/">See all {N} →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
