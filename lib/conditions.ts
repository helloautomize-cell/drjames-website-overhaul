import type { IconName } from "./icons";

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
  blobVariant: 0 | 1 | 2 | 3 | 4;
  conditions: Condition[];
}

export const conditionGroups: ConditionGroup[] = [
  {
    id: "diabetes-metabolism",
    label: "Diabetes and metabolism",
    intro:
      "From a first high sugar report to long-term care, with checks that protect your heart, kidneys and eyes.",
    blobVariant: 0,
    conditions: [
      {
        slug: "diabetes-and-prediabetes",
        title: "Diabetes and prediabetes",
        short: "Diabetes",
        line: "Early diagnosis and steady control",
        icon: "drop",
        badge: "diabetes",
      },
      {
        slug: "high-cholesterol",
        title: "High cholesterol",
        short: "High cholesterol",
        line: "Lower your heart risk",
        icon: "chol",
        badge: "cholesterol",
      },
      {
        slug: "weight-management",
        title: "Weight management",
        short: "Weight",
        line: "A medical plan for weight",
        icon: "tape",
        badge: "weight",
      },
      {
        slug: "thyroid-disorders",
        title: "Thyroid disorders",
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
    blobVariant: 1,
    conditions: [
      {
        slug: "high-blood-pressure",
        title: "High blood pressure",
        short: "High blood pressure",
        line: "Monitoring and a plan to reach target",
        icon: "bp",
        badge: "blood-pressure",
      },
      {
        slug: "heart-risk-assessment",
        title: "Heart risk assessment",
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
      "Breathing problems, chest infections, fevers and sleep, assessed and treated by a physician.",
    blobVariant: 2,
    conditions: [
      {
        slug: "asthma-and-breathing",
        title: "Asthma and breathing",
        short: "Asthma",
        line: "Wheeze, cough and breathlessness",
        icon: "lungs",
        badge: "asthma",
      },
      {
        slug: "chest-infections-and-pneumonia",
        title: "Chest infections and pneumonia",
        short: "Pneumonia",
        line: "Timely diagnosis and treatment",
        icon: "chest",
        badge: "chest",
      },
      {
        slug: "sleep-apnea",
        title: "Sleep apnea and sleep problems",
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
        title: "Fevers and infections",
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
    blobVariant: 3,
    conditions: [
      {
        slug: "kidney-problems",
        title: "Kidney problems",
        short: "Kidney problems",
        line: "Early checks and protection",
        icon: "kidney",
        badge: "kidney",
      },
      {
        slug: "fatty-liver",
        title: "Fatty liver",
        short: "Fatty liver",
        line: "Find the cause, protect the liver",
        icon: "liver",
        badge: "liver",
      },
      {
        slug: "digestive-problems",
        title: "Digestive problems",
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
    blobVariant: 4,
    conditions: [
      {
        slug: "care-for-older-adults",
        title: "Care for older adults",
        short: "Older adults",
        line: "Several conditions, one plan",
        icon: "elder",
        badge: "elderly-care",
      },
      {
        slug: "preventive-check-ups",
        title: "Preventive check-ups",
        short: "Check-ups",
        line: "Planned after a consultation",
        icon: "check",
        badge: "checkup",
      },
      {
        slug: "joint-pain-and-arthritis",
        title: "Joint pain and arthritis",
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
