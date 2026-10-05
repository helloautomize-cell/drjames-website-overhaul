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
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/doctor/dr-james-portrait.jpg`,
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:30",
      closes: "21:00",
    },
  ],
};

export const hospitalNode = {
  "@type": "Hospital" as const,
  "@id": `${SITE_URL}/#hospital`,
  name: site.hospital,
  address,
};

export const websiteNode = {
  "@type": "WebSite" as const,
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: site.name,
  publisher: { "@id": `${SITE_URL}/#dr-james` },
};

export const breadcrumbNode = (items: Crumb[]) => ({
  "@type": "BreadcrumbList" as const,
  "@id": `${SITE_URL}${items[items.length - 1]?.href ?? "/"}#breadcrumb`,
  itemListElement: items.map((c, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name: c.label,
    item: c.href ? `${SITE_URL}${c.href}` : undefined,
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
  author: { "@id": `${SITE_URL}/#dr-james` },
  reviewedBy: { "@id": `${SITE_URL}/#dr-james` },
  publisher: { "@id": `${SITE_URL}/#dr-james` },
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
