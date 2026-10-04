import { conditionGroups } from "@/lib/conditions";
import { postMeta } from "@/lib/content";

export interface ReadNext {
  slug: string;
  title: string;
}

/**
 * One Health Library post per condition group, matched on each post's first related
 * condition. Server-side only (reads the content folder at build time).
 */
export function readNextByGroup(): Record<string, ReadNext> {
  const out: Record<string, ReadNext> = {};
  for (const p of postMeta()) {
    const g = conditionGroups.find((cg) => cg.conditions.some((c) => c.slug === p.related[0]));
    if (g && !out[g.id]) out[g.id] = { slug: p.slug, title: p.title };
  }
  return out;
}
