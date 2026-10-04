import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDoc, withHeadingIds } from "@/lib/content";
import { site } from "@/lib/site-config";
import { Confirm } from "@/components/Confirm";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { Toc, BookCard } from "@/components/page/Aside";
import { ArticleBody } from "@/components/page/ArticleBody";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

export async function legalMetadata(slug: string): Promise<Metadata> {
  const doc = await legalDoc(slug);
  if (!doc) return {};
  return pageMeta(doc.title, doc.description, `/${slug}/`);
}

export async function LegalPage({ slug }: { slug: string }) {
  const doc = await legalDoc(slug);
  if (!doc) notFound();

  const { html, headings } = withHeadingIds(doc.html);
  const crumbs = [{ label: "Home", href: "/" }, { label: doc.heading }];
  const updatedConfirm = site.legalLastUpdated.includes("[CONFIRM]");

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode(`/${slug}/`, doc.heading, undefined, doc.lastReviewed),
          breadcrumbNode(crumbs),
        ]}
      />
      <div className="pg-hero">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1>{doc.heading}</h1>
          <p className="updated-note">
            Last updated{" "}
            {updatedConfirm ? <Confirm>{site.legalLastUpdated}</Confirm> : site.legalLastUpdated}
          </p>
        </div>
      </div>
      <div className="container">
        <div className="legal-grid">
          <div>
            <BookCard />
            <Toc items={headings} />
          </div>
          <ArticleBody html={html} />
        </div>
      </div>
    </main>
  );
}
