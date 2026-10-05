import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { ArticleBody } from "@/components/page/ArticleBody";
import { Toc, BookCard } from "@/components/page/Aside";
import { ReviewerBox } from "@/components/page/ReviewerBox";
import { FaqBlock } from "@/components/page/FaqBlock";
import { RelatedConditions } from "@/components/page/RelatedConditions";
import { postDoc, postMeta, withHeadingIds } from "@/lib/content";
import { site } from "@/lib/site-config";
import { Confirm } from "@/components/Confirm";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  blogPostingNode,
  faqPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

export function generateStaticParams() {
  return postMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await postDoc(slug);
  if (!doc) return {};
  return pageMeta(doc.title, doc.description, `/health-library/${slug}/`);
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await postDoc(slug);
  if (!doc) notFound();

  const { html, headings } = withHeadingIds(doc.html);
  const url = `/health-library/${slug}/`;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Health Library", href: "/health-library/" },
    { label: doc.heading },
  ];
  const published = doc.date.includes("[CONFIRM]");

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode(url, doc.heading, undefined, doc.lastReviewed),
          blogPostingNode(url, doc.heading, doc.description, published ? "2026-01-01" : doc.date),
          ...(doc.faqs.length ? [faqPageNode(url, doc.faqs)] : []),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title={doc.heading}
        meta={
          <>
            <Image
              src="/images/doctor/dr-james-avatar.jpg"
              alt=""
              width={36}
              height={36}
              style={{ borderRadius: "50%" }}
            />
            <span>
              <b>{site.name}</b>
            </span>
            <span className="chip">{doc.category}</span>
            <span>
              Published {published ? <Confirm>{doc.date}</Confirm> : doc.date}
              {doc.updated ? ` · Updated ${doc.updated}` : ""} · {doc.readingMinutes} min read
            </span>
          </>
        }
      />
      <div className="container">
        <div className="pg-grid">
          <div className="main">
            <aside className="brief-box">
              <b>In brief</b>
              <ul>
                {doc.inBrief.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </aside>
            <ArticleBody html={html} />
            <FaqBlock faqs={doc.faqs} />
            <ReviewerBox lastReviewed={doc.lastReviewed} />
            <RelatedConditions slugs={doc.related} />
          </div>
          <aside className="pg-aside">
            <BookCard />
            <Toc items={headings} />
          </aside>
        </div>
        <div style={{ paddingBottom: 64 }} />
      </div>
    </main>
  );
}
