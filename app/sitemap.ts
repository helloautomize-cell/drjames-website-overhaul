import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import {
  conditionMeta,
  publishedPostMeta,
  isDraftPost,
  legalMeta,
} from "@/lib/content";
import { conditionGroups } from "@/lib/conditions";

/** lastmod fallback = the source file's real mtime, never the build timestamp. */
const mtime = (rel: string) => fs.statSync(path.join(process.cwd(), rel)).mtime;

const CORE = [
  "/",
  "/about-dr-james/",
  "/contact/",
  "/your-visit/",
  "/faqs/",
  "/conditions/",
  "/health-library/",
];

/** lastmod for a guide: its updated date, else its publish date. */
const lastMod = (p: { date: string; updated: string | null }) =>
  p.updated ?? (isDraftPost(p) ? null : p.date);

const newest = (dates: (string | null | undefined)[]) =>
  dates.filter((d): d is string => !!d).sort().pop() ?? null;

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = publishedPostMeta();
  const topics = conditionGroups.filter((g) => guides.some((p) => p.topic === g.id));
  // Core pages change when the site does — use the freshest guide date.
  const coreLastmod = newest(guides.map(lastMod)) ?? mtime("app/page.tsx");

  const urls: MetadataRoute.Sitemap = [
    ...CORE.map((u) => ({
      url: `${SITE_URL}${u}`,
      lastModified: coreLastmod,
      changeFrequency: (u === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: u === "/" ? 1 : 0.7,
    })),
    ...conditionMeta().map((c) => ({
      url: `${SITE_URL}/conditions/${c.slug}/`,
      lastModified: c.updated ?? mtime(`resources/content/conditions/${c.slug}.md`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guides.map((p) => ({
      url: `${SITE_URL}/health-library/${p.slug}/`,
      lastModified: lastMod(p) ?? mtime(`resources/content/posts/${p.slug}.md`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...topics.map((g) => ({
      url: `${SITE_URL}/health-library/topic/${g.id}/`,
      lastModified:
        newest(guides.filter((p) => p.topic === g.id).map(lastMod)) ??
        mtime("app/health-library/topic/[topic]/page.tsx"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legalMeta().map((l) => ({
      url: `${SITE_URL}/${l.slug}/`,
      lastModified: l.updated ?? mtime(`resources/content/legal/${l.slug}.md`),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
  return urls;
}
