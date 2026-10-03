import Link from "next/link";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { Icon, type IconName } from "@/lib/icons";

const SHORT: Record<string, string> = {
  "high-cholesterol": "High cholesterol",
  "weight-management": "Weight",
  "thyroid-disorders": "Thyroid disorders",
  "high-blood-pressure": "High blood pressure",
  "heart-risk-assessment": "Heart risk",
  "asthma-and-breathing": "Asthma",
  "chest-infections-and-pneumonia": "Pneumonia",
  "sleep-apnea": "Sleep apnea",
  allergies: "Allergies",
  "fevers-and-infections": "Fevers",
  "kidney-problems": "Kidney problems",
  "fatty-liver": "Fatty liver",
  "digestive-problems": "Acidity and bloating",
  "joint-pain-and-arthritis": "Joint pain",
  anaemia: "Anaemia",
  "care-for-older-adults": "Older adults",
  "preventive-check-ups": "Check-ups",
  "diabetes-and-prediabetes": "Prediabetes",
};

function Pill({ slug, icon, label }: { slug: string; icon: string; label: string }) {
  return (
    <Link href={conditionUrl(slug)}>
      <Icon name={icon as IconName} size={18} strokeWidth={1.6} />
      {label}
    </Link>
  );
}

/**
 * Two rows of linked condition pills drifting in opposite directions.
 * Pauses on hover/focus/touch, static and wrapped under reduced motion,
 * single row on mobile.
 */
export function ConditionsMarquee() {
  const items = [
    { slug: "diabetes-and-prediabetes", icon: "drop", label: "Diabetes" },
    ...allConditions.map((c) => ({ slug: c.slug, icon: c.icon, label: SHORT[c.slug] ?? c.short })),
  ];
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div className="mq-wrap">
      {rows.map((row, i) => (
        <div className={`marquee${i === 1 ? " rev" : ""}`} key={i}>
          {[0, 1].map((dup) => (
            <span key={dup} aria-hidden={dup === 1} style={{ display: "contents" }}>
              {row.map((c) => (
                <Pill key={`${dup}-${c.slug}`} slug={c.slug} icon={c.icon} label={c.label} />
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
