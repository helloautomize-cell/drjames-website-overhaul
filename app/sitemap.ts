import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { conditionMeta, postMeta, legalMeta } from "@/lib/content";

const CORE = ["/", "/about-dr-james/", "/contact/", "/your-visit/", "/faqs/", "/conditions/", "/health-library/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [
    ...CORE,
    ...conditionMeta().map((c) => `/conditions/${c.slug}/`),
    ...postMeta().map((p) => `/health-library/${p.slug}/`),
    ...legalMeta().map((l) => `/${l.slug}/`),
  ];
  return urls.map((u) => ({
    url: `${SITE_URL}${u}`,
    lastModified: new Date(),
    changeFrequency: u === "/" ? "weekly" : "monthly",
    priority: u === "/" ? 1 : 0.7,
  }));
}
