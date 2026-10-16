import { conditionGroups, allConditions, type Condition, type ConditionGroup } from "./conditions";
import { isDraftPost, type PostMeta } from "./content";
import { SITE_URL } from "./seo";

/** The condition group a guide belongs to (front matter topic). */
export function topicOf(post: Pick<PostMeta, "topic">): ConditionGroup {
  return conditionGroups.find((g) => g.id === post.topic) ?? conditionGroups[0];
}

/** The guide's main condition (related[0]). */
export function mainCondition(post: Pick<PostMeta, "related">): Condition | undefined {
  return allConditions.find((c) => c.slug === post.related[0]);
}

/** "12 Oct 2026" from an ISO date; null for drafts or [CONFIRM] values. */
export function fmtDate(iso: string | null | undefined): string | null {
  if (!iso || iso === "draft" || iso.includes("[CONFIRM")) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** "16 October 2026" from an ISO date — the long review-date format. */
export function fmtDateLong(iso: string | null | undefined): string | null {
  if (!iso || iso === "draft" || iso.includes("[CONFIRM")) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Bar shown on every draft guide in localhost/preview builds. */
export const DRAFT_BAR = "Draft, not reviewed by Dr. James";

/** Day / "OCT 2026" pair for the list date mark; null for drafts. */
export function dateMark(iso: string): { day: string; my: string } | null {
  if (iso === "draft") return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return {
    day: String(d.getUTCDate()),
    my: d
      .toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })
      .toUpperCase(),
  };
}

/** Newest first by real date; drafts (no real date) keep file order at the end. */
export function sortNewest(posts: PostMeta[]): PostMeta[] {
  return [...posts].sort((a, b) => {
    const da = isDraftPost(a) ? "" : a.date;
    const db = isDraftPost(b) ? "" : b.date;
    return db.localeCompare(da);
  });
}

/** Featured guide: featured: true, newest if several; else the newest. */
export function featuredPost(posts: PostMeta[]): PostMeta | undefined {
  const sorted = sortNewest(posts);
  return sorted.find((p) => p.featured) ?? sorted[0];
}

export function guideUrl(slug: string) {
  return `/health-library/${slug}/`;
}

export function guideAbsUrl(slug: string) {
  return `${SITE_URL}${guideUrl(slug)}`;
}

/** Card haystack for the live search (title, standfirst, topic). */
export function searchText(p: PostMeta): string {
  return `${p.title} ${p.heading} ${p.standfirst} ${topicOf(p).label}`.toLowerCase();
}
