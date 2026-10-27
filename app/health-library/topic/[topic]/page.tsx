import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { LibraryTabs } from "@/components/page/LibraryTabs";
import { ClCard, ClusterSection } from "@/components/page/ClusterGuides";
import { publishedPostMeta } from "@/lib/content";
import { conditionGroups } from "@/lib/conditions";
import { clusterPosts } from "@/lib/clusters";
import { sortNewest } from "@/lib/library";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  hospitalNode,
  medicalClinicNode,
  websiteNode,
} from "@/lib/seo";

export function generateStaticParams() {
  const posts = publishedPostMeta();
  return conditionGroups
    .filter((g) => posts.some((p) => p.topic === g.id))
    .map((g) => ({ topic: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const g = conditionGroups.find((x) => x.id === topic);
  if (!g) return {};
  return pageMeta(
    `${g.label} guides`,
    `${g.intro} Plain-language guides written and reviewed by Dr. James.`,
    `/health-library/topic/${topic}/`,
  );
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const g = conditionGroups.find((x) => x.id === topic);
  if (!g) notFound();
  const all = publishedPostMeta();
  if (!all.some((p) => p.topic === g.id)) notFound();

  // Whole clusters only: a cluster shows when its pillar belongs to the
  // topic; standalone guides of the topic follow as normal cards.
  const clusters = clusterPosts(all).filter((c) => c.pillar.topic === g.id);
  const older = sortNewest(all.filter((p) => p.cluster == null && p.topic === g.id));

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Health Library", href: "/health-library/" },
    { label: g.label },
  ];

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode(
            `/health-library/topic/${g.id}/`,
            `${g.label} guides`,
            undefined,
            "[CONFIRM]",
          ),
          breadcrumbNode(crumbs),
        ]}
      />

      <section className="hl-hero hl-hero-t">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <span className="eyebrow">Health Library</span>
          <h1>{g.label} guides</h1>
          <p className="hl-hero-intro">
            {g.intro} Plain-language guides written and reviewed by Dr. James.
          </p>
        </div>
      </section>

      <LibraryTabs posts={all} active={g.id} />

      {clusters.map((c) => (
        <ClusterSection key={c.n} cluster={c} />
      ))}

      {older.length > 0 && (
        <section className="container cl-sec" aria-labelledby="hl-more-guides-h">
          <div className="cl-head">
            <h2 id="hl-more-guides-h">More guides from Dr. James</h2>
          </div>
          <div className="cl-grid">
            {older.map((p) => (
              <ClCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
