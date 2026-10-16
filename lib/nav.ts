import { site } from "./site-config";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; group?: string }[];
}

export const mainNav: NavItem[] = [
  { label: "Areas of Expertise", href: site.conditionsUrl },
  { label: "Your Visit", href: site.visitUrl },
  { label: "About Dr. James", href: site.profileUrl },
  { label: "Health Library", href: site.libraryUrl },
];

/** Conditions mega-menu columns (slugs resolve via conditionUrl). */
export const megaMenu: { h: string; links: { label: string; href: string }[] }[] = [
  {
    h: "Diabetes and Metabolism",
    links: [
      { label: "Diabetes and Prediabetes", href: "/conditions/diabetes-and-prediabetes/" },
      { label: "High Cholesterol", href: "/conditions/high-cholesterol/" },
      { label: "Weight Management", href: "/conditions/weight-management/" },
      { label: "Thyroid Disorders", href: "/conditions/thyroid-disorders/" },
    ],
  },
  {
    h: "Heart, Lungs and Sleep",
    links: [
      { label: "High Blood Pressure", href: "/conditions/high-blood-pressure/" },
      { label: "Heart Risk Assessment", href: "/conditions/heart-risk-assessment/" },
      { label: "Asthma and Breathing", href: "/conditions/asthma-and-breathing/" },
      { label: "Sleep Apnea", href: "/conditions/sleep-apnea/" },
    ],
  },
  {
    h: "Kidney, Liver and More",
    links: [
      { label: "Kidney Problems", href: "/conditions/kidney-problems/" },
      { label: "Fatty Liver", href: "/conditions/fatty-liver/" },
      { label: "Care for Older Adults", href: "/conditions/care-for-older-adults/" },
      { label: "Preventive Check-ups", href: "/conditions/preventive-check-ups/" },
    ],
  },
];

export const visitMenu: { label: string; href: string }[] = [
  { label: "Plan Your Visit", href: site.visitUrl },
  { label: "Book an Appointment", href: site.bookUrl },
  { label: "FAQs", href: site.faqsUrl },
];

export const footerNav = {
  conditions: [
    { label: "Diabetes and Prediabetes", href: "/conditions/diabetes-and-prediabetes/" },
    { label: "High Blood Pressure", href: "/conditions/high-blood-pressure/" },
    { label: "Thyroid Disorders", href: "/conditions/thyroid-disorders/" },
    { label: "Asthma and Breathing", href: "/conditions/asthma-and-breathing/" },
    { label: "Fatty Liver", href: "/conditions/fatty-liver/" },
    { label: "All Areas of Expertise", href: site.conditionsUrl },
  ],
  patients: [
    { label: "Plan Your Visit", href: site.visitUrl },
    { label: "About Dr. James", href: site.profileUrl },
    { label: "Health Library", href: site.libraryUrl },
    { label: "FAQs", href: site.faqsUrl },
    { label: "Book an Appointment", href: site.bookUrl },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms of Use", href: "/terms-of-use/" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer/" },
    { label: "Editorial and Medical Review", href: "/editorial-policy/" },
    { label: "Patient Rights", href: "/patient-rights/" },
    { label: "Appointments and Cancellations", href: "/appointments-and-cancellations/" },
    { label: "Accessibility", href: "/accessibility/" },
  ],
} as const;

export const utilityLinks = [
  { label: "Plan Your Visit", href: site.visitUrl },
  { label: "Health Library", href: site.libraryUrl },
];
