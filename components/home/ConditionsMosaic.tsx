import Link from "next/link";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/Badge";
import type { BadgeName } from "@/lib/badge-glyphs";

const N = allConditions.length;

/**
 * Eight body-system cards. Lab tag set is locked by the style guide:
 * HbA1c · BP · eGFR · SpO₂ · ALT · TSH · Ferritin · Vit D.
 */
const TILES: { badge: BadgeName; name: string; tag: string; text: string; slug: string }[] = [
  {
    badge: "blood-sugar",
    name: "Blood sugar",
    tag: "HbA1c",
    text: "Diabetes, prediabetes, weight",
    slug: "diabetes-and-prediabetes",
  },
  {
    badge: "heart-bp",
    name: "Heart and blood pressure",
    tag: "BP",
    text: "High blood pressure, cholesterol, heart risk",
    slug: "high-blood-pressure",
  },
  {
    badge: "kidneys",
    name: "Kidneys",
    tag: "eGFR",
    text: "Kidney problems, kidney protection in diabetes",
    slug: "kidney-problems",
  },
  {
    badge: "lungs",
    name: "Lungs and breathing",
    tag: "SpO₂",
    text: "Asthma, chest infections, pneumonia",
    slug: "asthma-and-breathing",
  },
  {
    badge: "liver-gut",
    name: "Liver and gut",
    tag: "ALT",
    text: "Fatty liver, acidity, bowel changes",
    slug: "fatty-liver",
  },
  {
    badge: "thyroid",
    name: "Thyroid",
    tag: "TSH",
    text: "Under and overactive thyroid",
    slug: "thyroid-disorders",
  },
  {
    badge: "sleep-energy",
    name: "Sleep and energy",
    tag: "Ferritin",
    text: "Sleep apnea, tiredness, anaemia",
    slug: "sleep-apnea",
  },
  {
    badge: "joints",
    name: "Joints and later life",
    tag: "Vit D",
    text: "Joint pain, care for older adults, check-ups",
    slug: "care-for-older-adults",
  },
];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * "Your body is one system": static navy badge-card grid with a stagger reveal.
 * Replaces the scroll-pinned scatter mosaic — the audit flagged the long pin.
 */
export function ConditionsMosaic() {
  return (
    <section className="sec" id="conditions" aria-labelledby="c-h">
      <div className="container">
        <div className="sec-h">
          <span className="eyebrow">Areas of expertise</span>
          <h2 id="c-h">
            Your body is one system. Your <em className="acc">care</em> should be too.
          </h2>
          <p>
            Blood sugar, the heart, kidneys, lungs, liver, thyroid, sleep and joints — rarely
            separate, so Dr. James looks at them together with one plan reviewed over time.
          </p>
        </div>
        <Reveal as="div" className="cond-grid" threshold={0.2}>
          {TILES.map((t) => (
            <Link key={t.slug} className="ccx" href={conditionUrl(t.slug)}>
              <span className="top">
                <Badge name={t.badge} />
                <span className="tag">{t.tag}</span>
              </span>
              <h3>{t.name}</h3>
              <p>{t.text}</p>
              <span className="go">
                Read about it <ArrowIcon />
              </span>
            </Link>
          ))}
        </Reveal>
        <div className="cond-foot">
          <span>Looked after together by one specialist internist</span>
          <Link className="lnk" href="/conditions/">
            All {N} areas of expertise →
          </Link>
        </div>
      </div>
    </section>
  );
}
