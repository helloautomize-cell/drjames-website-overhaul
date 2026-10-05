/**
 * Single source of truth for every fact on the site.
 * Nothing in this file may be invented: values come from resources/docs/.
 * Items still open with the client are marked via `confirm`.
 */

const graduationYear = 2002;
const omanSince = 2012;

// REVISIT BEFORE LAUNCH: site shows years since 2002 (24 in 2026). Hospital
// profile (brhoman.com) says 19 years, old site said 23. Client to confirm
// which count to publish.
/**
 * Years in medicine and in Oman, computed once from the two source years so every
 * surface (hero strip, About, structured data) always shows the same pair.
 * [CONFIRM with client: show computed years, or the fixed 23 / 15 the old site used]
 */
export function experience(year = new Date().getFullYear()) {
  return { inMedicine: year - graduationYear, inOman: year - omanSince };
}

const exp = experience();

export const site = {
  name: "Dr. James Kumar Pallivathukkal",
  shortName: "Dr. James",
  logoName: "Dr. James Pallivathukkal",
  title: "Specialist in Internal Medicine and Diabetes",
  role: "Head of Internal Medicine and Head of Quality Control, Badr Al Samaa Royal Hospital, Muscat",
  roleShort: "Head of Internal Medicine",
  hospital: "Badr Al Samaa Royal Hospital",
  committees: ["Ethics Committee", "Infection Control Committee", "Pharmacy Council"],
  graduationYear,
  omanSince,
  yearsInMedicine: exp.inMedicine,
  sinceYear: graduationYear,
  yearsInOman: exp.inOman,
  award:
    "Associated with a Guinness World Records achievement for maximum diabetes patient screening at Badr Al Samaa Royal Hospital, 2025.",
  /** Degrees shown once, in the training ledger. `confirm` renders only outside production. */
  training: [
    {
      abbr: "MBBS",
      subject: "Medicine",
      inst: "Vinayaka Missions Kirupananda Variyar Medical College, Tamil Nadu, 2002",
    },
    { abbr: "MD", subject: "Internal Medicine", inst: "Manipal, 2007" },
    { abbr: "PG Dip", subject: "Diabetes", inst: "Cardiff University, 2012" },
    {
      abbr: "MBA",
      subject: "Hospital management",
      inst: "Vinayaka Missions University, 2012",
    },
    {
      abbr: "MSc",
      subject: "Diabetes",
      inst: "2014",
      confirm: "[CONFIRM: Cardiff or University of South Wales]",
    },
    {
      abbr: "DBA",
      subject: "Business administration",
      inst: "Coventry University, 2024",
    },
  ],
  // names to be checked against certificates before launch
  furtherTraining: [
    "Physician Leadership, Stanford Medicine",
    "Leadership programme, NHS (Edward Jenner programme)",
    "Certificate course in Emergency Medicine, Apollo Hospitals and Medvarsity, India",
    "Certificate course in Rheumatology, IMA Delhi",
    "Medicine and the Arts, University of Cape Town",
    "Medical certification, Petroleum Development Oman (PDO)",
  ],
  quote:
    "Every patient deserves not only the right treatment but also the right understanding of their health. My goal is to empower patients through knowledge, prevention, and personalized care so they can live healthier and more fulfilling lives.",
  address: {
    hospital: "Badr Al Samaa Royal Hospital",
    street: "Al Ghubrah Street",
    city: "Muscat 133",
    country: "Oman",
    plusCode: "HCP6+M8F",
  },
  mapsUrl: "https://maps.app.goo.gl/pud75RVoC8PLH8ap7",
  phoneDisplay: "+968 9751 0975",
  phoneTel: "tel:+96897510975",
  whatsapp: "https://wa.me/96897510975",
  emailDisplay: "omanjamesp [at] gmail.com",
  email: "omanjamesp@gmail.com",
  emergency: "9999",
  hours: "Saturday to Thursday, 8:30 am to 9 pm",
  hoursShort: "Sat to Thu, 8:30 am to 9 pm",
  hoursClosed: "Friday closed",
  schedule: { open: [8, 30], close: [21, 0], closedDays: [5] },
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
