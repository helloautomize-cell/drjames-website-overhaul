"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/lib/site-config";

const TABS = ["Portrait", "Training", "Experience", "Leadership"] as const;
const BASE = -28;
const TILT = -14;

/**
 * Credential cube: four designed faces on CSS 3D transforms.
 * Quarter turn every 4s; pauses on hover, focus, drag and hidden tab;
 * drag or arrow keys turn it; the four tabs are the accessible way to
 * read every face. Under reduced motion it stays on the portrait and the
 * tabs switch faces without animation.
 */
export function CredentialCube() {
  const scene = useRef<HTMLDivElement>(null);
  const cube = useRef<HTMLDivElement>(null);
  const tbar = useRef<HTMLSpanElement>(null);
  const api = useRef<{ select: (face: number) => void } | null>(null);

  useEffect(() => {
    const el = scene.current;
    const c = cube.current;
    if (!el || !c) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let turn = 0;
    let hold = false;
    let drag: number | null = null;
    let resume: ReturnType<typeof setTimeout>;

    const idx = () => ((turn % 4) + 4) % 4;

    const apply = (extra = 0) => {
      c.style.transform = `rotateX(${TILT}deg) rotateY(${BASE - 90 * turn + extra}deg)`;
    };

    const show = () => {
      apply();
      const i = idx();
      el.parentElement
        ?.querySelectorAll<HTMLButtonElement>(".cube-tabs button")
        .forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
      if (tbar.current) tbar.current.style.transform = `translateX(${i * 100}%)`;
      const face = c.querySelector(`.f${i}`);
      if (face) {
        face.classList.remove("sheen");
        void (face as HTMLElement).offsetWidth;
        face.classList.add("sheen");
      }
    };

    const go = (n: number) => {
      turn = n;
      show();
    };

    const pause = () => {
      hold = true;
      clearTimeout(resume);
      resume = setTimeout(() => {
        hold = false;
      }, 6000);
    };

    api.current = {
      select(face: number) {
        const d = ((face - idx()) % 4 + 4) % 4;
        go(turn + (d === 3 ? -1 : d));
        pause();
      },
    };

    const enter = () => {
      hold = true;
    };
    const leave = () => {
      if (drag === null) pause();
    };
    const focus = () => {
      hold = true;
    };
    const blur = () => pause();
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        go(turn + 1);
        pause();
      }
      if (e.key === "ArrowLeft") {
        go(turn - 1);
        pause();
      }
    };
    const down = (e: PointerEvent) => {
      drag = e.clientX;
      c.style.transition = "none";
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (drag !== null) apply((e.clientX - drag) * 0.45);
    };
    const end = (e: PointerEvent) => {
      if (drag === null) return;
      const dx = e.clientX - drag;
      drag = null;
      c.style.transition = "";
      if (Math.abs(dx) > 40) go(turn + (dx < 0 ? 1 : -1));
      else apply();
      pause();
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focus", focus);
    el.addEventListener("blur", blur);
    el.addEventListener("keydown", key);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);

    show();

    const timer = reduce
      ? null
      : setInterval(() => {
          if (!hold && drag === null && !document.hidden) go(turn + 1);
        }, 4000);

    return () => {
      if (timer) clearInterval(timer);
      clearTimeout(resume);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focus", focus);
      el.removeEventListener("blur", blur);
      el.removeEventListener("keydown", key);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      api.current = null;
    };
  }, []);

  return (
    <>
      <div
        className="scene"
        ref={scene}
        tabIndex={0}
        aria-label="Credential cube. Use the tabs below or drag to turn."
      >
        <div className="cube" ref={cube}>
          <div className="face f0">
            <span className="glow" />
            <span className="arch" />
            <Image
              className="cut"
              src="/images/doctor/dr-james-hero.png"
              alt="Dr. James Kumar Pallivathukkal in a white coat"
              width={419}
              height={716}
              priority
            />
            <div className="plate">
              <b>Dr. James Kumar Pallivathukkal</b>
              <span>Head of Internal Medicine</span>
            </div>
          </div>
          <div className="face f1 cface">
            <span className="k">Training</span>
            <div className="big">MD</div>
            <p className="lead">
              Internal Medicine
              <br />
              <small>Manipal · 2007</small>
            </p>
            <ul>
              <li>
                <b>MSc</b> Diabetes, University of South Wales
              </li>
              <li>
                <b>PG Dip</b> Diabetes, Cardiff University
              </li>
              <li>
                <b>MBA</b> Hospital management
              </li>
            </ul>
          </div>
          <div className="face f2 cface">
            <span className="k">Experience</span>
            <div className="big">
              {site.yearsInMedicine}<sup>+</sup>
            </div>
            <p className="lead">
              years in medicine
              <br />
              <small>since {site.sinceYear}</small>
            </p>
            <ul>
              <li>
                <b>15 yrs</b> caring for patients in Oman
              </li>
              <li>
                <b>ICU</b> and ER lead, MBBM Hospital, Kerala
              </li>
              <li>
                <b>COVID‑19</b> ICU operations lead, Muscat
              </li>
            </ul>
          </div>
          <div className="face f3 cface">
            <span className="k">Leadership</span>
            <Image
              className="thumb"
              src="/images/doctor/dr-james-portrait.jpg"
              alt="Dr. James at Badr Al Samaa Royal Hospital"
              width={84}
              height={84}
            />
            <p className="lead">
              Head of Internal Medicine
              <br />
              Head of Quality Control
            </p>
            <ul>
              <li>Badr Al Samaa Royal Hospital, Muscat</li>
              <li>Ethics, Infection Control and Pharmacy committees</li>
            </ul>
          </div>
          <div className="face top">
            <LogoMark white />
          </div>
          <div className="face bottom" />
        </div>
        <div className="floor">
          <span className="ring" />
          <span className="shadow" />
        </div>
      </div>
      <div className="cube-tabs" role="tablist" aria-label="Cube faces">
        {TABS.map((t, j) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={j === 0}
            onClick={() => api.current?.select(j)}
          >
            {t}
          </button>
        ))}
        <span className="tbar" ref={tbar} />
      </div>
    </>
  );
}
