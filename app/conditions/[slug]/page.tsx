import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { ArticleBody } from "@/components/page/ArticleBody";
import { Toc, BookCard } from "@/components/page/Aside";
import { ReviewerBox } from "@/components/page/ReviewerBox";
import { FaqBlock } from "@/components/page/FaqBlock";
import { RelatedConditions } from "@/components/page/RelatedConditions";
import { conditionDoc, conditionMeta, withHeadingIds } from "@/lib/content";
import { allConditions, conditionCoin, conditionPhoto } from "@/lib/conditions";
import { reasonForSlug } from "@/lib/booking-context";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  medicalConditionNode,
  faqPageNode,
  physicianNode,
  hospitalNode,
  medicalClinicNode,
  websiteNode,
} from "@/lib/seo";

export function generateStaticParams() {
  return conditionMeta().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await conditionDoc(slug);
  if (!doc) return {};
  return pageMeta(doc.title, doc.description, `/conditions/${slug}/`);
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await conditionDoc(slug);
  if (!doc) notFound();

  const cond = allConditions.find((c) => c.slug === slug);
  const { html, headings } = withHeadingIds(doc.html);
  const url = `/conditions/${slug}/`;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Areas of Expertise", href: "/conditions/" },
    { label: doc.heading },
  ];
  const toc = headings.filter((h) => h.id !== "when-to-get-help-straight-away");

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode(
            url,
            doc.heading,
            { "@id": `${url}#condition` },
            doc.reviewedOn ?? doc.lastReviewed,
          ),
          medicalConditionNode(url, doc.heading, doc.description),
          faqPageNode(url, doc.faqs),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title={doc.heading}
        intro={doc.intro}
        coin={cond ? conditionCoin(cond) : undefined}
        img={{ ...conditionPhoto(slug), width: 1800, height: 1200 }}
        reason={reasonForSlug(slug)}
        reviewed={{ lastReviewed: doc.reviewedOn }}
      />
      <div className="container">
        <div className="pg-grid">
          <div className="main">
            <ArticleBody html={html} />
            <FaqBlock faqs={doc.faqs} />
            <ReviewerBox lastReviewed={doc.reviewedOn} />
            <RelatedConditions slugs={doc.related} />
            {doc.relatedPost ? (
              <p className="prose" style={{ marginTop: 28 }}>
                From the Health Library:{" "}
                <Link href={`/health-library/${doc.relatedPost}/`}>
                  {doc.relatedPost.replace(/-/g, " ")}
                </Link>
              </p>
            ) : null}
          </div>
          <aside className="pg-aside">
            <BookCard />
            <Toc items={toc} />
          </aside>
        </div>
        <div style={{ paddingBottom: 64 }} />
      </div>
    </main>
  );
}
