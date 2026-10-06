import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { GuideCover } from "@/components/page/GuideCover";
import { GuideToc } from "@/components/page/GuideToc";
import { GuideProgress } from "@/components/page/GuideProgress";
import { GuideShare } from "@/components/page/GuideShare";
import { GuideConditionCard } from "@/components/page/GuideConditionCard";
import { GuideCard } from "@/components/page/GuideCard";
import { QuestionsToAsk } from "@/components/page/QuestionsToAsk";
import { ConditionRow } from "@/components/page/ConditionRow";
import { ReviewerBox } from "@/components/page/ReviewerBox";
import { FaqBlock } from "@/components/page/FaqBlock";
import { BookButton } from "@/components/BookButton";
import { Icon } from "@/lib/icons";
import {
  isDraftPost,
  postDoc,
  publishedPostMeta,
  withHeadingIds,
} from "@/lib/content";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { fmtDate, guideUrl, mainCondition, sortNewest, topicOf } from "@/lib/library";
import { site } from "@/lib/site-config";
import { SITE_URL } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { bookingUrl, reasonForSlug } from "@/lib/booking-context";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  blogPostingNode,
  medicalConditionNode,
  faqPageNode,
  physicianNode,
  hospitalNode,
  medicalClinicNode,
  websiteNode,
} from "@/lib/seo";

export function generateStaticParams() {
  return publishedPostMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await postDoc(slug);
  if (!doc) return {};
  return pageMeta(doc.title, doc.description ?? doc.standfirst, guideUrl(slug));
}

const domain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await postDoc(slug);
  if (!doc || (isDraftPost(doc) && process.env.VERCEL_ENV === "production")) notFound();

  const { html, headings } = withHeadingIds(doc.html);
  const url = guideUrl(slug);
  const absUrl = `${SITE_URL}${url}`;
  const topic = topicOf(doc);
  const main = mainCondition(doc);
  const draft = isDraftPost(doc);
  const published = fmtDate(doc.date);
  const updated = fmtDate(doc.updated);
  const reviewed = fmtDate(doc.lastReviewed);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Health Library", href: "/health-library/" },
    { label: topic.label, href: `/health-library/topic/${topic.id}/` },
  ];

  const keepReading = sortNewest(
    publishedPostMeta().filter((p) => p.slug !== slug),
  )
    .sort((a, b) => Number(b.topic === doc.topic) - Number(a.topic === doc.topic))
    .slice(0, 2);

  const moreConditions = doc.related.slice(1);

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode(url, doc.heading, undefined, doc.lastReviewed),
          blogPostingNode({
            url,
            heading: doc.heading,
            description: doc.description ?? doc.standfirst,
            image: doc.image ?? `${url}opengraph-image`,
            datePublished: doc.date,
            dateModified: doc.updated,
            lastReviewed: doc.lastReviewed,
            ...(main
              ? {
                  about: medicalConditionNode(
                    conditionUrl(main.slug),
                    main.title,
                    main.line,
                  ),
                }
              : {}),
          }),
          ...(doc.faqs.length ? [faqPageNode(url, doc.faqs)] : []),
          breadcrumbNode(crumbs),
        ]}
      />
      <GuideProgress />
      <article>
        <header className="gd-head">
          <div className="container">
            <Breadcrumbs items={crumbs} />
            <span className="eyebrow">{topic.label}</span>
            <h1>{doc.heading}</h1>
            <p className="gd-stand">{doc.standfirst}</p>
            <div className="gd-byline">
              <Image
                src="/images/doctor/d04-headshot-160sq.jpg"
                alt=""
                width={40}
                height={40}
                className="gd-avatar"
              />
              <span className="gd-who">
                <b>
                  Written and reviewed by {site.name}, {site.title}
                </b>
                <small className="num">
                  {updated
                    ? `Updated ${updated}`
                    : published
                      ? `Published ${published}`
                      : null}
                  {updated || published ? " · " : ""}
                  {reviewed ? `Reviewed ${reviewed} · ` : ""}
                  {doc.readingMinutes} min read
                </small>
              </span>
              {draft && <span className="draft-chip">Draft</span>}
              <GuideShare title={doc.heading} url={absUrl} />
            </div>
            <figure className="gd-coverfig">
              <GuideCover post={doc} sizes="(max-width: 1200px) 100vw, 1180px" priority />
              {(doc.imageCaption || doc.imageCredit) && (
                <figcaption>
                  {[doc.imageCaption, doc.imageCredit && `Photo: ${doc.imageCredit}`]
                    .filter(Boolean)
                    .join(". ")}
                </figcaption>
              )}
            </figure>
            <div className="gd-quick">
              <b>Quick answer</b>
              <p>{doc.quickAnswer}</p>
            </div>
          </div>
        </header>

        <div className="container gd-grid">
          <aside className="gd-side">
            <GuideToc items={headings}>
              <GuideConditionCard slug={doc.related[0]} />
            </GuideToc>
          </aside>

          <div className="gd-main">
            <details className="gd-toc-m">
              <summary>
                In this guide
                <Icon name="chevron" size={18} />
              </summary>
              <ol>
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>
                      <i aria-hidden="true">{i + 1}</i>
                      <span>{h.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="prose guide" id="gd-body" dangerouslySetInnerHTML={{ __html: html }} />

            {doc.localSection && main && (
              <section className="gd-block gd-local" aria-labelledby="gd-local-h">
                <h2 id="gd-local-h">{topic.label} in Muscat: when to see a physician</h2>
                <p>
                  Dr. James sees adults with {main.title.toLowerCase()} at {site.hospital}, Al
                  Ghubrah, by appointment.
                </p>
                <div className="cx-rows">
                  <ConditionRow condition={main} />
                  <Link className="cx-row" href={site.visitUrl}>
                    <span className="cx-row-ic" aria-hidden="true">
                      <Icon name="check" size={24} />
                    </span>
                    <b>Plan your visit</b>
                    <span className="cx-row-d">Where to go and what to bring</span>
                    <span className="cx-row-go" aria-hidden="true">
                      <Icon name="arrow" size={18} />
                    </span>
                  </Link>
                  <Link className="cx-row" href={bookingUrl(reasonForSlug(main.slug))}>
                    <span className="cx-row-ic" aria-hidden="true">
                      <Icon name="calendar" size={24} />
                    </span>
                    <b>Book a consultation</b>
                    <span className="cx-row-d">By appointment only</span>
                    <span className="cx-row-go" aria-hidden="true">
                      <Icon name="arrow" size={18} />
                    </span>
                  </Link>
                </div>
              </section>
            )}

            <QuestionsToAsk items={doc.questionsToAsk} heading={doc.heading} />

            <section className="gd-block gd-takeaways" aria-labelledby="gd-takeaways-h">
              <h2 id="gd-takeaways-h">Key takeaways</h2>
              <div className="gd-takeaways-panel">
                <ul>
                  {doc.keyTakeaways.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </section>

            <FaqBlock faqs={doc.faqs} heading="Common questions" />

            {doc.sources.length > 0 && (
              <section className="gd-block gd-sources" aria-labelledby="gd-sources-h">
                <h2 id="gd-sources-h">Sources</h2>
                <ol>
                  {doc.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.name}
                      </a>
                      <span className="gd-src-dom"> · {domain(s.url)}</span>
                    </li>
                  ))}
                </ol>
                <p className="gd-disclaimer">
                  This guide is for general information and does not replace a consultation.{" "}
                  <Link href="/editorial-policy/">Editorial and medical review policy</Link>
                </p>
              </section>
            )}

            <ReviewerBox lastReviewed={doc.lastReviewed} />

            {moreConditions.length > 0 && (
              <section className="gd-block gd-related" aria-labelledby="gd-related-h">
                <h2 id="gd-related-h">Related conditions</h2>
                <div className="cx-rows">
                  {moreConditions.map((slug2, i) => {
                    const c = allConditions.find((x) => x.slug === slug2);
                    return c ? <ConditionRow key={slug2} condition={c} index={i} /> : null;
                  })}
                </div>
              </section>
            )}

            {keepReading.length > 0 && (
              <section className="gd-block gd-keep" aria-labelledby="gd-keep-h">
                <h2 id="gd-keep-h">Keep reading</h2>
                <div className="gd-keep-grid">
                  {keepReading.map((p) => (
                    <GuideCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            )}

            <GuideConditionCard slug={doc.related[0]} className="gd-condcard-m" />
          </div>
        </div>

        <div className="container gd-close">
          <div className="ctaband">
            <h3>
              Talk to Dr. James about <em className="acc">{topic.label.toLowerCase()}</em>
            </h3>
            <p>Book a consultation at {site.hospital}.</p>
            <div className="btns">
              <BookButton
                onDark
                label="Book appointment"
                href={bookingUrl(reasonForSlug(doc.related[0]))}
              />
              <a
                className="btn wa-btn"
                href={whatsappLink(topic.label)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
