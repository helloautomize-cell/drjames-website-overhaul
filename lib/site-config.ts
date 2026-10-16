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

/**
 * Single source of truth for clinic hours: consulting sessions per weekday
 * (0 = Sunday … 6 = Saturday), [open, close) as 24h hours in Asia/Muscat.
 * Every hours display, the live-status chip and JSON-LD derive from this.
 */
const CLINIC_SESSIONS: Record<number, [number, number][]> = {
  0: [[9, 13], [17, 21]],
  1: [[9, 13], [17, 21]],
  2: [[9, 13], [17, 21]],
  3: [[9, 13], [17, 21]],
  4: [[9, 13], [17, 21]],
  5: [],
  6: [[9, 13], [17, 21]],
};

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const fmtHour = (h: number) =>
  h === 12 ? "12 pm" : h < 12 ? `${h} am` : `${h - 12} pm`;
/** "9 am to 1 pm" / "5 to 9 pm" — shared meridiem is written once. */
const fmtPair = (o: number, c: number) =>
  o < 12 === c < 12 ? `${o % 12 === 0 ? 12 : o % 12} to ${fmtHour(c)}` : `${fmtHour(o)} to ${fmtHour(c)}`;
const fmtSessions = (s: [number, number][]) => s.map(([o, c]) => fmtPair(o, c)).join(" and ");
const range = (days: number[], names: string[]) =>
  days.length > 1 ? `${names[days[0]]} to ${names[days[days.length - 1]]}` : names[days[0]];

/** Consecutive weekday runs sharing a session pattern, in the Sat-first clinic week. */
function sessionGroups() {
  const groups: { days: number[]; sessions: [number, number][] }[] = [];
  for (const d of [6, 0, 1, 2, 3, 4, 5]) {
    const s = CLINIC_SESSIONS[d];
    const last = groups[groups.length - 1];
    if (last && JSON.stringify(last.sessions) === JSON.stringify(s)) last.days.push(d);
    else groups.push({ days: [d], sessions: s });
  }
  return groups;
}

const SESSION_GROUPS = sessionGroups();
const HOURS = SESSION_GROUPS.filter((g) => g.sessions.length)
  .map((g) => `${range(g.days, DAY_LONG)}, ${fmtSessions(g.sessions)}`)
  .join("; ");
const HOURS_SHORT = SESSION_GROUPS.filter((g) => g.sessions.length)
  .map((g) => `${range(g.days, DAY_SHORT)}, ${fmtSessions(g.sessions)}`)
  .join("; ");
const HOURS_CLOSED = SESSION_GROUPS.filter((g) => !g.sessions.length)
  .map((g) => `${range(g.days, DAY_LONG)} closed`)
  .join("; ");
/** Day/time rows for grid displays (visit card, your-visit). */
const HOURS_ROWS = SESSION_GROUPS.map((g) => ({
  days: range(g.days, DAY_SHORT),
  times: g.sessions.length
    ? g.sessions.map(([o, c]) => fmtPair(o, c).replace(" to ", " – ")).join(" + ")
    : "Closed",
  closed: !g.sessions.length,
}));

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
  // REVISIT: confirm address and coordinates against the new Maps pin (Oct 2026)
  address: {
    hospital: "Badr Al Samaa Royal Hospital",
    street: "Al Ghubrah Street",
    city: "Muscat 133",
    country: "Oman",
    plusCode: "HCP6+M8F",
  },
  mapsUrl: "https://maps.app.goo.gl/dNKkw9XcfZngPQG26",
  phoneDisplay: "+968 9751 0975",
  phoneTel: "tel:+96897510975",
  whatsapp: "https://wa.me/96897510975",
  emailDisplay: "omanjamesp [at] gmail.com",
  email: "omanjamesp@gmail.com",
  sessions: CLINIC_SESSIONS,
  hours: HOURS,
  hoursShort: HOURS_SHORT,
  hoursClosed: HOURS_CLOSED,
  hoursRows: HOURS_ROWS,
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
