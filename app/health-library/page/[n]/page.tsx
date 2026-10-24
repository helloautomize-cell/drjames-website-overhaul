import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { LibraryTabs } from "@/components/page/LibraryTabs";
import { LibraryList } from "@/components/page/LibraryList";
import { publishedPostMeta } from "@/lib/content";
import { featuredPost, sortNewest } from "@/lib/library";
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

const PAGE = 12;

/**
 * Crawlable pagination for the index list (the "Show more" button is the
 * client-side path; these routes carry the same rows for crawlers).
 */
export function generateStaticParams() {
  const extra = Math.ceil(
    Math.max(0, publishedPostMeta().length - 1) / PAGE, // minus the featured slot
  );
  return Array.from({ length: Math.max(0, extra - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  return pageMeta(
    `Health Library, page ${n}`,
    `Page ${n} of Dr. James's Health Library — more plain-language guides on diabetes, heart, thyroid, liver, kidney and sleep health in Muscat.`,
    `/health-library/page/${n}/`,
  );
}

export default async function LibraryPageN({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const num = Number(n);
  if (!Number.isInteger(num) || num < 1) notFound();
  if (num === 1) redirect("/health-library/");

  const posts = sortNewest(publishedPostMeta());
  const feat = featuredPost(posts);
  const rows = posts.filter((p) => p.slug !== feat?.slug);
  const slice = rows.slice((num - 1) * PAGE, num * PAGE);
  if (!slice.length) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Health Library", href: "/health-library/" },
    { label: `Page ${num}` },
  ];

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode(`/health-library/page/${num}/`, `Health Library, page ${num}`, undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs),
        ]}
      />
      <section className="hl-hero hl-hero-t">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <span className="eyebrow">Health Library</span>
          <h1>All guides</h1>
        </div>
      </section>
      <LibraryTabs posts={publishedPostMeta()} active="all" />
      <section className="container hl-all" aria-label={`Guides, page ${num}`}>
        <LibraryList posts={slice} />
        <nav className="hl-pager" aria-label="More pages">
          {num > 2 && (
            <Link href={`/health-library/page/${num - 1}/`}>Previous page</Link>
          )}
          {num === 2 && <Link href="/health-library/">Previous page</Link>}
          {rows.length > num * PAGE && (
            <Link href={`/health-library/page/${num + 1}/`}>Next page</Link>
          )}
        </nav>
      </section>
    </main>
  );
}
