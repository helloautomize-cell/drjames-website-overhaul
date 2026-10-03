/**
 * Single source of truth for every fact on the site.
 * Nothing in this file may be invented: values come from resources/docs/.
 * Items still open with the client are marked via `confirm`.
 */

const startYear = 2002;
const omanStartYear = 2011;
const now = new Date().getFullYear();

export const site = {
  name: "Dr. James Kumar Pallivathukkal",
  shortName: "Dr. James",
  logoName: "Dr. James Pallivathukkal",
  title: "Specialist in Internal Medicine and Diabetes",
  role: "Head of Internal Medicine and Head of Quality Control, Badr Al Samaa Royal Hospital, Muscat",
  roleShort: "Head of Internal Medicine",
  hospital: "Badr Al Samaa Royal Hospital",
  committees: ["Ethics Committee", "Infection Control Committee", "Pharmacy Council"],
  yearsInMedicine: now - startYear,
  sinceYear: startYear,
  yearsInOman: now - omanStartYear,
  award:
    "Associated with a Guinness World Records achievement for maximum diabetes patient screening at Badr Al Samaa Royal Hospital, 2025.",
  quote:
    "Every patient deserves not only the right treatment but also the right understanding of their health. My goal is to empower patients through knowledge, prevention, and personalized care so they can live healthier and more fulfilling lives.",
  address: {
    hospital: "Badr Al Samaa Royal Hospital",
    street: "Al Ghubrah Street",
    city: "Muscat 133",
    country: "Oman",
    plusCode: "HCP6+M8F",
  },
  mapsUrl: "https://maps.app.goo.gl/buQWhCo2fTABnAGT9",
  phoneDisplay: "+968 9751 0975",
  phoneTel: "tel:+96897510975",
  whatsapp: "https://wa.me/96897510975",
  emailDisplay: "omanjamesp [at] gmail.com",
  email: "omanjamesp@gmail.com",
  emergency: "9999",
  hours: "Saturday to Thursday, 8:30 am to 9 pm",
  hoursShort: "Sat to Thu, 8:30 am to 9 pm",
  hoursClosed: "Friday closed",
  timeZone: "Asia/Muscat",
  bookUrl: "/contact/#book",
  profileUrl: "/about-dr-james/",
  contactUrl: "/contact/",
  conditionsUrl: "/conditions/",
  visitUrl: "/your-visit/",
  faqsUrl: "/faqs/",
  libraryUrl: "/health-library/",
  legalLastUpdated: "[CONFIRM]",
  mohLicence: "[CONFIRM: number]",
  languages: ["English"],
  languagesConfirm: true,
} as const;

export type Site = typeof site;
