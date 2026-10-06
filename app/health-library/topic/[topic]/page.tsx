import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { LibraryTabs } from "@/components/page/LibraryTabs";
import { LibraryList } from "@/components/page/LibraryList";
import { LibraryMore } from "@/components/page/LibraryMore";
import { publishedPostMeta } from "@/lib/content";
import { conditionGroups } from "@/lib/conditions";
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
  const posts = sortNewest(all.filter((p) => p.topic === g.id));
  if (!posts.length) notFound();

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

      <section className="container hl-all" aria-label={`${g.label} guides`}>
        <LibraryList posts={posts} />
        {posts.length > 12 && <LibraryMore />}
      </section>
    </main>
  );
}
