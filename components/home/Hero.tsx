import Link from "next/link";
import Image from "next/image";
import heroCutout from "@/public/images/doctor/d02-hero-cutout.png";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { BookPill } from "@/components/site/BookPill";
import { LiveStatus } from "@/components/site/LiveStatus";
import { Badge } from "@/components/Badge";
import type { BadgeName } from "@/lib/badge-glyphs";

/** The eight body systems orbiting the portrait — each links to its condition page. */
const ORBITS: { name: BadgeName; label: string; href: string }[] = [
  { name: "blood-sugar", label: "Blood sugar", href: "/conditions/diabetes-and-prediabetes/" },
  { name: "heart-bp", label: "Heart and blood pressure", href: "/conditions/high-blood-pressure/" },
  { name: "kidneys", label: "Kidneys", href: "/conditions/kidney-problems/" },
  { name: "lungs", label: "Lungs and breathing", href: "/conditions/asthma-and-breathing/" },
  { name: "liver-gut", label: "Liver and gut", href: "/conditions/fatty-liver/" },
  { name: "thyroid", label: "Thyroid", href: "/conditions/thyroid-disorders/" },
  { name: "sleep-energy", label: "Sleep and energy", href: "/conditions/sleep-apnea/" },
  { name: "joints", label: "Joints and later life", href: "/conditions/care-for-older-adults/" },
];

const AREAS = [
  { n: "01", label: "Diabetes & metabolic health", href: "/conditions/#g-diabetes-metabolism" },
  { n: "02", label: "Complex adult medicine", href: "/conditions/#g-whole-person" },
  { n: "03", label: "Preventive care", href: "/conditions/preventive-check-ups/" },
  { n: "04", label: "Critical care experience", href: "/about-dr-james/" },
];

const words = ["A", "physician", "who", "sees", "the"];
const accWords = ["whole", "picture."];

/**
 * Navy orbit hero: headline rises word by word, the eight body systems orbit
 * the cut-out portrait, credentials sit in a glass band below. CSS: .hxo/.sys
 * in app/v2.css. Static under reduced motion.
 */
export function Hero() {
  const w = (word: string, i: number) => (
    <span key={word} className="hxo-w" aria-hidden="true">
      <span style={{ ["--i" as string]: i }}>{word}&nbsp;</span>
    </span>
  );
  return (
    <section className="hxo" aria-labelledby="hero-h" data-header="dark">
      <div className="hxo-bg" aria-hidden="true" />
      <div className="container hxo-grid">
        <div>
          <span className="live-chip">
            <LiveStatus />
            <span className="lc-sub">· {site.hospital}</span>
          </span>
          <br />
          <span className="eyebrow">Specialist internist · Muscat, Oman</span>
          <h1 id="hero-h" className="hxo-h1" aria-label="A physician who sees the whole picture.">
            {words.map(w)} <em className="acc">{accWords.map((word, k) => w(word, k + words.length))}</em>
          </h1>
          <p className="hxo-lead">
            Comprehensive internal medicine for long-term health. Diabetes, heart and kidney risk,
            lungs and complex adult conditions, looked after together by one senior specialist.
          </p>
          <div className="btnrow">
            <BookPill large />
            <a className="btn btn-gh" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4cc38a" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
              </svg>
              Message on WhatsApp
            </a>
          </div>
          <nav className="hxo-areas" aria-label="Areas of care">
            {AREAS.map((a) => (
              <Link key={a.n} href={a.href}>
                <i>{a.n}</i>
                {a.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="sys" role="group" aria-label="The eight body systems Dr. James looks after">
          <i className="glow" aria-hidden="true" />
          <svg className="rings" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="hxo-rg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#C9A66B" />
                <stop offset="1" stopColor="#7FBFB3" />
              </linearGradient>
            </defs>
            <g className="rot">
              <circle cx="50" cy="50" r="44" fill="none" stroke="url(#hxo-rg)" strokeWidth=".25" strokeDasharray=".6 1.6" opacity=".9" />
            </g>
            <g className="rot rev">
              <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(201,166,107,.22)" strokeWidth=".2" />
              <circle cx="50" cy="1" r=".9" fill="#C9A66B" />
            </g>
            <circle cx="50" cy="50" r="37" fill="none" stroke="rgba(127,191,179,.22)" strokeWidth=".2" />
          </svg>
          <div className="orbring" aria-hidden="false">
            {ORBITS.map((o, n) => (
              <div key={o.name} className="orb" style={{ ["--a" as string]: `${n * 45}deg` }}>
                <Link href={o.href} aria-label={o.label}>
                  <Badge name={o.name} />
                  <span className="lb">{o.label}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="core">
            <Image
              src={heroCutout}
              alt="Dr. James Kumar Pallivathukkal, Specialist Internist, in a white coat with arms crossed"
              preload
              fetchPriority="high"
              quality={90}
              sizes="(max-width: 600px) 58vw, 330px"
              placeholder="empty"
              className="core-img"
            />
            <div data-face-box aria-hidden="true" />
          </div>
          <div className="flt f2">
            <span className="ic">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 2 3 5v5c0 4 3 7 7 8 4-1 7-4 7-8V5Z" />
                <path d="m7 10 2 2 4-4" />
              </svg>
            </span>
            <div>
              <b>Head of Internal Medicine</b>
              <span>&amp; Head of Quality, {site.hospital}</span>
            </div>
          </div>
          <div className="flt f1">
            <span className="ic">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2 7 10 3l8 4-8 4-8-4Z" />
                <path d="M5 9v4c0 1 2 3 5 3s5-2 5-3V9" />
              </svg>
            </span>
            <div>
              <b>UK-trained in diabetes</b>
              <span>PG Dip, Cardiff University · MSc</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="band">
          <div>
            <b>
              {site.yearsInMedicine}
              <sup>yrs</sup>
            </b>
            <span>in medicine, {site.yearsInOman} of them in Oman</span>
          </div>
          <div>
            <b>MD</b>
            <span>Internal Medicine, Manipal, 2007</span>
          </div>
          <div>
            <b>UK</b>
            <span>Diabetes training: PG Diploma, Cardiff University, and MSc</span>
          </div>
          <div>
            <b>18</b>
            <span>conditions looked after, together under one physician</span>
          </div>
        </div>
      </div>
    </section>
  );
}
