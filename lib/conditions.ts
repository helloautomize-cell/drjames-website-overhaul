import type { IconName } from "./icons";
import type { BadgeName } from "./badge-glyphs";

export interface Condition {
  slug: string;
  title: string;
  short: string;
  line: string;
  icon: IconName;
  badge: string;
}

export interface ConditionGroup {
  id: string;
  label: string;
  intro: string;
  /** Badge that stands for the whole group in menus and previews. */
  icon: IconName;
  blobVariant: 0 | 1 | 2 | 3 | 4;
  conditions: Condition[];
}

export const conditionGroups: ConditionGroup[] = [
  {
    id: "diabetes-metabolism",
    label: "Diabetes and metabolism",
    intro:
      "From a first high sugar report to long-term care, with checks that protect your heart, kidneys and eyes.",
    icon: "drop",
    blobVariant: 0,
    conditions: [
      {
        slug: "diabetes-and-prediabetes",
        title: "Diabetes and Prediabetes",
        short: "Diabetes",
        line: "Early diagnosis and steady control",
        icon: "drop",
        badge: "diabetes",
      },
      {
        slug: "high-cholesterol",
        title: "High Cholesterol",
        short: "High cholesterol",
        line: "Lower your heart risk",
        icon: "chol",
        badge: "cholesterol",
      },
      {
        slug: "weight-management",
        title: "Weight Management",
        short: "Weight",
        line: "A medical plan for weight",
        icon: "tape",
        badge: "weight",
      },
      {
        slug: "thyroid-disorders",
        title: "Thyroid Disorders",
        short: "Thyroid disorders",
        line: "Under and overactive thyroid",
        icon: "thy",
        badge: "thyroid",
      },
    ],
  },
  {
    id: "heart-blood-pressure",
    label: "Heart and blood pressure",
    intro: "For high blood pressure and for people who want to know their heart risk.",
    icon: "heart",
    blobVariant: 1,
    conditions: [
      {
        slug: "high-blood-pressure",
        title: "High Blood Pressure",
        short: "High blood pressure",
        line: "Monitoring and a plan to reach target",
        icon: "bp",
        badge: "blood-pressure",
      },
      {
        slug: "heart-risk-assessment",
        title: "Heart Risk Assessment",
        short: "Heart risk",
        line: "Find and reduce risk early",
        icon: "heart",
        badge: "heart-risk",
      },
    ],
  },
  {
    id: "lungs-sleep-infections",
    label: "Lungs, sleep and infections",
    intro:
      "Breathing problems, chest infections, fevers and sleep, assessed and treated by an internist.",
    icon: "lungs",
    blobVariant: 2,
    conditions: [
      {
        slug: "asthma-and-breathing",
        title: "Asthma and Breathing",
        short: "Asthma",
        line: "Wheeze, cough and breathlessness",
        icon: "lungs",
        badge: "asthma",
      },
      {
        slug: "chest-infections-and-pneumonia",
        title: "Chest Infections and Pneumonia",
        short: "Pneumonia",
        line: "Timely diagnosis and treatment",
        icon: "chest",
        badge: "chest",
      },
      {
        slug: "sleep-apnea",
        title: "Sleep Apnea and Sleep Problems",
        short: "Sleep apnea",
        line: "Snoring, insomnia, daytime tiredness",
        icon: "sleep",
        badge: "sleep",
      },
      {
        slug: "allergies",
        title: "Allergies",
        short: "Allergies",
        line: "Find the trigger, ease symptoms",
        icon: "allergy",
        badge: "allergy",
      },
      {
        slug: "fevers-and-infections",
        title: "Fevers and Infections",
        short: "Fevers",
        line: "Find the cause, treat it right",
        icon: "therm",
        badge: "fever",
      },
    ],
  },
  {
    id: "kidney-liver-gut",
    label: "Kidney, liver and gut",
    intro: "Common problems of the kidneys, liver and gut, found early and managed well.",
    icon: "kidney",
    blobVariant: 3,
    conditions: [
      {
        slug: "kidney-problems",
        title: "Kidney Problems",
        short: "Kidney problems",
        line: "Early checks and protection",
        icon: "kidney",
        badge: "kidney",
      },
      {
        slug: "fatty-liver",
        title: "Fatty Liver",
        short: "Fatty liver",
        line: "Find the cause, protect the liver",
        icon: "liver",
        badge: "liver",
      },
      {
        slug: "digestive-problems",
        title: "Digestive Problems",
        short: "Acidity and bloating",
        line: "Acidity, bloating, bowel changes",
        icon: "gut",
        badge: "digestion",
      },
    ],
  },
  {
    id: "whole-person",
    label: "Whole-person care",
    intro: "Care for older adults with several conditions, and check-ups planned by the doctor.",
    icon: "check",
    blobVariant: 4,
    conditions: [
      {
        slug: "care-for-older-adults",
        title: "Care for Older Adults",
        short: "Older adults",
        line: "Several conditions, one plan",
        icon: "elder",
        badge: "elderly-care",
      },
      {
        slug: "preventive-check-ups",
        title: "Preventive Check-ups",
        short: "Check-ups",
        line: "Planned after a consultation",
        icon: "check",
        badge: "checkup",
      },
      {
        slug: "joint-pain-and-arthritis",
        title: "Joint Pain and Arthritis",
        short: "Joint pain",
        line: "Ease pain, keep moving",
        icon: "joint",
        badge: "joint",
      },
      {
        slug: "anaemia",
        title: "Anaemia",
        short: "Anaemia",
        line: "Why is haemoglobin low",
        icon: "rbc",
        badge: "anaemia",
      },
    ],
  },
];

export const allConditions: Condition[] = conditionGroups.flatMap((g) => g.conditions);

export function conditionUrl(slug: string) {
  return `/conditions/${slug}/`;
}

export function conditionGroup(slug: string) {
  return conditionGroups.find((g) => g.conditions.some((c) => c.slug === slug));
}

/** Graded group photography per design/handoff/IMAGE-MAP.md. */
export const GROUP_PHOTO: Record<string, { src: string; alt: string; imagePosition?: string }> = {
  "diabetes-metabolism": {
    src: "/images/doctor/d08-blood-sugar-1800w.jpg",
    alt: "Dr. James showing a patient a blood glucose reading",
    imagePosition: "40% 18%",
  },
  "heart-blood-pressure": {
    src: "/images/doctor/d09-blood-pressure-1200w.jpg",
    alt: "Dr. James measuring a patient's blood pressure",
  },
  "kidney-liver-gut": {
    src: "/images/doctor/d09-blood-pressure-1200w.jpg",
    alt: "Dr. James measuring a patient's blood pressure",
  },
  "lungs-sleep-infections": {
    src: "/images/doctor/d10-lungs-1200w.jpg",
    alt: "Dr. James listening to a patient's lungs with a stethoscope",
  },
  "whole-person": {
    src: "/images/doctor/d10-lungs-1200w.jpg",
    alt: "Dr. James listening to a patient's lungs with a stethoscope",
  },
};

/** Hero photo for a condition page; falls back to the results photo. */
export function conditionPhoto(slug: string) {
  const g = conditionGroup(slug);
  return (
    (g && GROUP_PHOTO[g.id]) ?? {
      src: "/images/doctor/d05-results-1200w.jpg",
      alt: "Dr. James reviewing a patient's lab report",
    }
  );
}

/** Coin badge for a condition, keyed off its service-badge slug. */
const BADGE_TO_COIN: Record<string, BadgeName> = {
  diabetes: "blood-sugar",
  cholesterol: "heart-bp",
  weight: "blood-sugar",
  thyroid: "thyroid",
  "blood-pressure": "heart-bp",
  "heart-risk": "heart-bp",
  asthma: "lungs",
  chest: "lungs",
  sleep: "sleep-energy",
  allergy: "lungs",
  fever: "lungs",
  kidney: "kidneys",
  liver: "liver-gut",
  digestion: "liver-gut",
  "elderly-care": "joints",
  checkup: "tests-reason",
  joint: "joints",
  anaemia: "sleep-energy",
};

export function conditionCoin(c: Condition): BadgeName {
  return BADGE_TO_COIN[c.badge] ?? "together";
}

/** Plain-language entry pills under the hero (section 4.3). */
export const concerns: { label: string; icon: IconName; slug: string }[] = [
  { label: "High sugar or diabetes", icon: "drop", slug: "diabetes-and-prediabetes" },
  { label: "Blood pressure or heart", icon: "heart", slug: "high-blood-pressure" },
  { label: "Cough or breathlessness", icon: "lungs", slug: "asthma-and-breathing" },
  { label: "Snoring or tiredness", icon: "sleep", slug: "sleep-apnea" },
  { label: "Weight concerns", icon: "tape", slug: "weight-management" },
  { label: "A full check-up", icon: "check", slug: "preventive-check-ups" },
  { label: "Care for a parent", icon: "elder", slug: "care-for-older-adults" },
];
