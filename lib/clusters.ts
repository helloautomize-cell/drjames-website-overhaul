import type { PostMeta } from "./content";

/**
 * The 10 guide-series clusters (content calendar order). Each cluster is one
 * pillar guide with its five support guides; the three older guides carry no
 * cluster and stay standalone.
 */
export const CLUSTERS = [
  { n: 1, name: "Diabetes and prediabetes" },
  { n: 2, name: "High blood pressure" },
  { n: 3, name: "Thyroid disorders" },
  { n: 4, name: "Kidney health" },
  { n: 5, name: "Fatty liver disease" },
  { n: 6, name: "GLP-1 for diabetes and weight loss" },
  { n: 7, name: "Sleep disorders" },
  { n: 8, name: "Asthma and breathing" },
  { n: 9, name: "Obesity and weight management" },
  { n: 10, name: "Abdominal pain and gastritis" },
] as const;

export type Cluster = {
  n: number;
  name: string;
  pillar: PostMeta;
  /** The five support guides in calendar order (clusterOrder 1-5). */
  supports: PostMeta[];
};

/**
 * Builds the cluster list from published guides in calendar order. Fails the
 * build when a cluster that appears in the front matter is incomplete.
 */
export function clusterPosts(posts: PostMeta[]): Cluster[] {
  const byN = new Map<number, PostMeta[]>();
  for (const p of posts) {
    if (p.cluster == null) continue;
    const list = byN.get(p.cluster) ?? [];
    list.push(p);
    byN.set(p.cluster, list);
  }
  const out: Cluster[] = [];
  for (const c of CLUSTERS) {
    const members = byN.get(c.n);
    if (!members || members.length === 0) continue;
    const pillars = members.filter((p) => p.role === "pillar");
    const supports = members
      .filter((p) => p.role === "support")
      .sort((a, b) => (a.clusterOrder ?? 99) - (b.clusterOrder ?? 99));
    if (pillars.length !== 1 || supports.length !== 5) {
      throw new Error(
        `Health Library cluster ${c.n} (${c.name}) must have exactly 1 pillar ` +
          `and 5 support guides; found ${pillars.length} pillar(s) and ` +
          `${supports.length} support(s) [${members.map((m) => m.slug).join(", ")}].`,
      );
    }
    out.push({ n: c.n, name: c.name, pillar: pillars[0], supports });
  }
  return out;
}

/** Cluster definition a guide belongs to, or null for standalone guides. */
export function clusterOf(post: Pick<PostMeta, "cluster">): { n: number; name: string } | null {
  if (post.cluster == null) return null;
  return CLUSTERS.find((c) => c.n === post.cluster) ?? null;
}

/**
 * The guide's cluster mates in display order (pillar first, then supports
 * 1-5), excluding the guide itself. Null for standalone guides.
 */
export function seriesMates(post: PostMeta, posts: PostMeta[]): PostMeta[] | null {
  if (post.cluster == null) return null;
  const cluster = clusterPosts(posts).find((c) => c.n === post.cluster);
  if (!cluster) return null;
  return [cluster.pillar, ...cluster.supports].filter((p) => p.slug !== post.slug);
}
