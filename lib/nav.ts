import { site } from "./site-config";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; group?: string }[];
}

export const mainNav: NavItem[] = [
  { label: "Conditions", href: site.conditionsUrl },
  { label: "Your visit", href: site.visitUrl },
  { label: "About Dr. James", href: site.profileUrl },
  { label: "Health Library", href: site.libraryUrl },
];

/** Conditions mega-menu columns (slugs resolve via conditionUrl). */
export const megaMenu: { h: string; links: { label: string; href: string }[] }[] = [
  {
    h: "Diabetes and metabolism",
    links: [
      { label: "Diabetes and prediabetes", href: "/conditions/diabetes-and-prediabetes/" },
      { label: "High cholesterol", href: "/conditions/high-cholesterol/" },
      { label: "Weight management", href: "/conditions/weight-management/" },
      { label: "Thyroid disorders", href: "/conditions/thyroid-disorders/" },
    ],
  },
  {
    h: "Heart, lungs and sleep",
    links: [
      { label: "High blood pressure", href: "/conditions/high-blood-pressure/" },
      { label: "Heart risk assessment", href: "/conditions/heart-risk-assessment/" },
      { label: "Asthma and breathing", href: "/conditions/asthma-and-breathing/" },
      { label: "Sleep apnea", href: "/conditions/sleep-apnea/" },
    ],
  },
  {
    h: "Kidney, liver and more",
    links: [
      { label: "Kidney problems", href: "/conditions/kidney-problems/" },
      { label: "Fatty liver", href: "/conditions/fatty-liver/" },
      { label: "Care for older adults", href: "/conditions/care-for-older-adults/" },
      { label: "Preventive check-ups", href: "/conditions/preventive-check-ups/" },
    ],
  },
];

export const visitMenu: { label: string; href: string }[] = [
  { label: "Plan your visit", href: site.visitUrl },
  { label: "Book an appointment", href: site.bookUrl },
  { label: "FAQs", href: site.faqsUrl },
];

export const footerNav = {
  conditions: [
    { label: "Diabetes and prediabetes", href: "/conditions/diabetes-and-prediabetes/" },
    { label: "High blood pressure", href: "/conditions/high-blood-pressure/" },
    { label: "Thyroid disorders", href: "/conditions/thyroid-disorders/" },
    { label: "Asthma and breathing", href: "/conditions/asthma-and-breathing/" },
    { label: "Fatty liver", href: "/conditions/fatty-liver/" },
    { label: "All conditions", href: site.conditionsUrl },
  ],
  patients: [
    { label: "Plan your visit", href: site.visitUrl },
    { label: "About Dr. James", href: site.profileUrl },
    { label: "Health Library", href: site.libraryUrl },
    { label: "FAQs", href: site.faqsUrl },
    { label: "Book an appointment", href: site.bookUrl },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy-policy/" },
    { label: "Terms of use", href: "/terms-of-use/" },
    { label: "Medical disclaimer", href: "/medical-disclaimer/" },
    { label: "Editorial and medical review", href: "/editorial-policy/" },
    { label: "Patient rights", href: "/patient-rights/" },
    { label: "Appointments and cancellations", href: "/appointments-and-cancellations/" },
    { label: "Accessibility", href: "/accessibility/" },
  ],
} as const;

export const utilityLinks = [
  { label: "Plan your visit", href: site.visitUrl },
  { label: "Health Library", href: site.libraryUrl },
];
