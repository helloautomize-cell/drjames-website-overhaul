/**
 * SEO helpers: per-page metadata and one JSON-LD @graph per page.
 * The SITE_INDEXABLE env var gates indexing until launch: while it is
 * unset or "false", every page is noindex and robots.txt disallows all.
 */
import type { Metadata } from "next";
import { site } from "./site-config";
import type { Crumb } from "@/components/shell/Breadcrumbs";

export const SITE_URL = process.env.SITE_URL ?? "https://drjamesp.com";

export const siteIndexable = process.env.SITE_INDEXABLE === "true";

const robots = siteIndexable
  ? { index: true, follow: true }
  : { index: false, follow: false };

export function pageMeta(
  title: string,
  description: string,
  path: string,
  opts: { noindex?: boolean } = {},
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    robots: opts.noindex ? { index: false, follow: false } : robots,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: site.name,
      type: "website",
      locale: "en_OM",
      // explicit: the root opengraph-image file does not apply to child
      // segments when openGraph is set per page
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, type: "image/png" }],
    },
  };
}

/* ---------- JSON-LD graph nodes ---------- */

const address = {
  "@type": "PostalAddress" as const,
  streetAddress: `${site.address.hospital}, ${site.address.street}`,
  addressLocality: "Muscat",
  postalCode: "133",
  addressCountry: "OM",
};

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** OpeningHoursSpecification entries derived from site.sessions. */
const openingHours = Object.entries(site.sessions).flatMap(([d, ss]) =>
  ss.map(([o, c]) => ({
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: DAY_NAMES[Number(d)],
    opens: `${String(o).padStart(2, "0")}:00`,
    closes: `${String(c).padStart(2, "0")}:00`,
  })),
);

/** Coordinates of the Google Maps pin embedded in site.mapsPlaceUrl. */
const geo = {
  "@type": "GeoCoordinates" as const,
  latitude: 23.5865399,
  longitude: 58.4108339,
};

// [CONFIRM: real consultation fee range] — no fee is published on the site; the
// FAQ sends patients to the hospital billing desk. "$$" is the neutral
// price-level indicator until the client supplies the actual range.
const priceRange = "$$";

/** The brand mark already shipped in /public; used for logo fields. */
const logo = {
  "@type": "ImageObject" as const,
  url: `${SITE_URL}/icons/icon-512.png`,
  width: 512,
  height: 602,
};

export const physicianNode = {
  "@type": "Physician" as const,
  "@id": `${SITE_URL}/#dr-james`,
  name: site.name,
  alternateName: site.logoName,
  jobTitle: site.title,
  description: `${site.title}. ${site.role}.`,
  medicalSpecialty: "InternalMedicine",
  telephone: site.phoneDisplay.replace(/\s/g, ""),
  email: site.email,
  address,
  url: `${SITE_URL}${site.profileUrl}`,
  image: `${SITE_URL}/images/doctor/d04-headshot.jpg`,
  // his personal profiles + the Google Maps listing; the Hospital node gets
  // no sameAs — these are not the hospital's accounts
  sameAs: [...site.social.map((s) => s.href), site.mapsPlaceUrl],
  workLocation: { "@id": `${SITE_URL}/#hospital` },
  affiliation: { "@id": `${SITE_URL}/#hospital` },
  knowsLanguage: site.languages,
  alumniOf: [
    // confirmed institutions only; the MSc university stays out until the client
    // confirms Cardiff vs University of South Wales (see site.training)
    {
      "@type": "CollegeOrUniversity",
      name: "Vinayaka Missions Kirupananda Variyar Medical College, Tamil Nadu",
    },
    { "@type": "CollegeOrUniversity", name: "Manipal Institute of Health Sciences, Karnataka" },
    { "@type": "CollegeOrUniversity", name: "Cardiff University" },
    { "@type": "CollegeOrUniversity", name: "Vinayaka Missions University" },
    { "@type": "CollegeOrUniversity", name: "Coventry University" },
  ],
  // TODO: add areaServed with the patient towns once the client confirms the list
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "MBBS Medicine, 2002" },
    { "@type": "EducationalOccupationalCredential", name: "MD Internal Medicine, Manipal, 2007" },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Postgraduate Diploma in Diabetes, Cardiff University, 2012",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "MSc Diabetes, 2014",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "MBA Hospital Management, Vinayaka Missions University, 2012",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "DBA Business Administration, Coventry University, 2024",
    },
  ],
  memberOf: site.committees.map((c) => ({
    "@type": "Organization" as const,
    name: `${c}, ${site.hospital}`,
  })),
  contactPoint: {
    "@type": "ContactPoint" as const,
    contactType: "appointments",
    telephone: site.phoneDisplay.replace(/\s/g, ""),
    email: site.email,
    url: `${SITE_URL}/contact/`,
    availableLanguage: site.languages,
  },
  geo,
  priceRange,
  openingHoursSpecification: openingHours,
};

export const hospitalNode = {
  "@type": "Hospital" as const,
  "@id": `${SITE_URL}/#hospital`,
  name: site.hospital,
  address,
  // the hospital's own contact details and profiles, from its official site
  // brhoman.com — Dr. James's phone and socials are his, not the hospital's
  telephone: "+96822387777",
  url: "https://brhoman.com/",
  image: `${SITE_URL}/images/doctor/d01-hero-2400w.jpg`,
  sameAs: [
    "https://www.instagram.com/badralsamaaroyal",
    "https://x.com/badr_royal",
    "https://youtube.com/@badralsamaaroyal",
    "https://www.facebook.com/share/p/Znejy5cQj13zP19n/",
  ],
  hasMap: site.mapsUrl,
  geo,
  priceRange,
  openingHoursSpecification: openingHours,
};

/** The Internal Medicine clinic Dr. James runs inside the hospital. */
export const medicalClinicNode = {
  "@type": "MedicalClinic" as const,
  "@id": `${SITE_URL}/#clinic`,
  name: `Internal Medicine Clinic — ${site.hospital}`,
  medicalSpecialty: ["InternalMedicine", "Endocrinology"] as const,
  address,
  telephone: site.phoneDisplay.replace(/\s/g, ""),
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/clinic/dr-james-consultation.jpg`,
  logo,
  sameAs: [site.mapsPlaceUrl],
  geo,
  priceRange,
  isPartOf: { "@id": `${SITE_URL}/#hospital` },
  employee: { "@id": `${SITE_URL}/#dr-james` },
  openingHoursSpecification: openingHours,
};

export const websiteNode = {
  "@type": "WebSite" as const,
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: site.name,
  alternateName: site.shortName,
  publisher: { "@id": `${SITE_URL}/#dr-james` },
};

export const breadcrumbNode = (items: Crumb[], path: string) => ({
  "@type": "BreadcrumbList" as const,
  "@id": `${SITE_URL}${path}#breadcrumb`,
  itemListElement: items.map((c, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name: c.label,
    // the last crumb is the current page — its item is the canonical URL
    item: c.href ? `${SITE_URL}${c.href}` : `${SITE_URL}${path}`,
  })),
});

export const medicalWebPageNode = (
  url: string,
  name: string,
  about: Record<string, unknown> | undefined,
  lastReviewed: string,
) => ({
  "@type": "MedicalWebPage" as const,
  "@id": `${SITE_URL}${url}#webpage`,
  url: `${SITE_URL}${url}`,
  name,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: about ?? { "@id": `${SITE_URL}/#dr-james` },
  reviewedBy: { "@id": `${SITE_URL}/#dr-james` },
  // omit rather than ship a "[CONFIRM]" marker into structured data
  ...(lastReviewed.includes("[CONFIRM") ? {} : { lastReviewed }),
});

export const medicalConditionNode = (url: string, name: string, description: string) => ({
  "@type": "MedicalCondition" as const,
  "@id": `${SITE_URL}${url}#condition`,
  name,
  description,
  url: `${SITE_URL}${url}`,
});

export const faqPageNode = (url: string, faqs: { q: string; a: string }[]) => ({
  "@type": "FAQPage" as const,
  "@id": `${SITE_URL}${url}#faq`,
  isPartOf: { "@id": `${SITE_URL}${url}#webpage` },
  mainEntity: faqs
    .filter((f) => !f.q.includes("[CONFIRM") && !f.a.includes("[CONFIRM"))
    .map((f) => ({
      "@type": "Question" as const,
      name: f.q,
      acceptedAnswer: { "@type": "Answer" as const, text: f.a },
    })),
});

const realDate = (d: string | null | undefined): d is string =>
  !!d && d !== "draft" && !d.includes("[CONFIRM");

/** BlogPosting for a guide; every date field is omitted unless it is real. */
export const blogPostingNode = (opts: {
  url: string;
  heading: string;
  description: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  lastReviewed?: string | null;
  about?: Record<string, unknown>;
}) => ({
  "@type": "BlogPosting" as const,
  "@id": `${SITE_URL}${opts.url}#post`,
  headline: opts.heading,
  description: opts.description,
  url: `${SITE_URL}${opts.url}`,
  ...(opts.image ? { image: `${SITE_URL}${opts.image}` } : {}),
  ...(realDate(opts.datePublished) ? { datePublished: opts.datePublished } : {}),
  ...(realDate(opts.dateModified) ? { dateModified: opts.dateModified } : {}),
  ...(realDate(opts.lastReviewed) ? { lastReviewed: opts.lastReviewed } : {}),
  // @id merges this with the canonical Physician node; name and url are
  // inline so the Article fields resolve even without @id dereferencing
  author: {
    "@type": "Physician" as const,
    "@id": `${SITE_URL}/#dr-james`,
    name: site.name,
    url: `${SITE_URL}${site.profileUrl}`,
  },
  reviewedBy: { "@id": `${SITE_URL}/#dr-james` },
  publisher: {
    "@type": "MedicalClinic" as const,
    "@id": `${SITE_URL}/#clinic`,
    name: medicalClinicNode.name,
    logo,
  },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  ...(opts.about ? { about: opts.about } : {}),
});

/** Renders one @graph per page. Never emits AggregateRating or Review. */
export function JsonLd({ graph }: { graph: Record<string, unknown>[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
