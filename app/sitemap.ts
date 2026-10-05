import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import {
  conditionMeta,
  publishedPostMeta,
  isDraftPost,
  legalMeta,
} from "@/lib/content";
import { conditionGroups } from "@/lib/conditions";

const CORE = ["/", "/about-dr-james/", "/contact/", "/your-visit/", "/faqs/", "/conditions/", "/health-library/"];

/** lastmod for a guide: its updated date, else its publish date. */
const lastMod = (p: { date: string; updated: string | null }) =>
  p.updated ?? (isDraftPost(p) ? null : p.date);

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = publishedPostMeta();
  const topics = conditionGroups.filter((g) => guides.some((p) => p.topic === g.id));

  const urls: MetadataRoute.Sitemap = [
    ...CORE.map((u) => ({
      url: `${SITE_URL}${u}`,
      lastModified: new Date(),
      changeFrequency: (u === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: u === "/" ? 1 : 0.7,
    })),
    ...conditionMeta().map((c) => ({
      url: `${SITE_URL}/conditions/${c.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guides.map((p) => ({
      url: `${SITE_URL}/health-library/${p.slug}/`,
      lastModified: lastMod(p) ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...topics.map((g) => ({
      url: `${SITE_URL}/health-library/topic/${g.id}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legalMeta().map((l) => ({
      url: `${SITE_URL}/${l.slug}/`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
  return urls;
}
