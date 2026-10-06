import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { LibrarySearch } from "@/components/page/LibrarySearch";
import { LibraryTabs } from "@/components/page/LibraryTabs";
import { LibraryList } from "@/components/page/LibraryList";
import { LibraryMore } from "@/components/page/LibraryMore";
import { GuideCover } from "@/components/page/GuideCover";
import { GuideCard } from "@/components/page/GuideCard";
import { BookButton } from "@/components/BookButton";
import { Icon } from "@/lib/icons";
import { isDraftPost, publishedPostMeta, type PostMeta } from "@/lib/content";
import { conditionGroups } from "@/lib/conditions";
import { featuredPost, fmtDate, guideUrl, sortNewest, topicOf } from "@/lib/library";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/seo";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta(
    "Health Library",
    "Plain-language guides on the conditions Dr. James sees most, each one written and reviewed by him. Heart, sleep, gut health and more.",
    "/health-library/",
  ),
  alternates: {
    canonical: `${SITE_URL}/health-library/`,
    types: { "application/rss+xml": `${SITE_URL}/health-library/rss.xml` },
  },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Health Library" }];

/** "New" when the guide was published within the last 30 days. */
const isNew = (p: PostMeta) =>
  !isDraftPost(p) && Date.now() - new Date(`${p.date}T00:00:00Z`).getTime() < 30 * 86400000;

export default function LibraryPage() {
  const posts = publishedPostMeta();
  const sorted = sortNewest(posts);
  const feat = featuredPost(posts);
  const rows = sorted.filter((p) => p.slug !== feat?.slug);
  const featuredTopic = feat ? topicOf(feat) : null;
  const featuredReviewed = feat ? fmtDate(feat.lastReviewed) : null;
  // Topic shelves only earn their place with a real catalogue (spec 3.5).
  const shelves =
    posts.length >= 8
      ? conditionGroups
          .map((g) => ({ g, items: sorted.filter((p) => p.topic === g.id).slice(0, 3) }))
          .filter((s) => s.items.length >= 3)
      : [];

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          medicalWebPageNode("/health-library/", "Health Library", undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs),
        ]}
      />

      <section className="hl-hero">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <div className="hl-hero-grid">
            <div>
              <span className="eyebrow">Health Library</span>
              <h1>
                Understand your health, <em>in plain words</em>.
              </h1>
            </div>
            <div className="hl-hero-r">
              <p>
                Plain-language guides on the conditions Dr. James sees most, each one written
                and reviewed by him.
              </p>
              <LibrarySearch />
            </div>
          </div>
          <div className="ph-band">
            <Image
              src="/images/doctor/d05-results-1800w.jpg"
              alt="Dr. James reviewing a patient's lab report"
              width={1800}
              height={1200}
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <LibraryTabs posts={posts} active="all" />

      {feat && featuredTopic && (
        <section className="hl-feat container" aria-label="Featured guide">
          <Link className="hl-feat-img" href={guideUrl(feat.slug)} tabIndex={-1} aria-hidden="true">
            <GuideCover post={feat} sizes="(max-width: 900px) 100vw, 660px" priority />
            {isDraftPost(feat) && <span className="draft-chip">Draft</span>}
          </Link>
          <div className="hl-feat-txt">
            <span className="hl-feat-top">
              <span className="hl-topic">{featuredTopic.label}</span>
              {isNew(feat) && <span className="hl-new">New</span>}
            </span>
            <h2>
              <Link href={guideUrl(feat.slug)}>{feat.heading}</Link>
            </h2>
            <p>{feat.standfirst}</p>
            <span className="hl-feat-by">
              <Image
                src="/images/doctor/d04-headshot-160sq.jpg"
                alt=""
                width={24}
                height={24}
              />
              {site.shortName}
              {featuredReviewed ? ` · Reviewed ${featuredReviewed}` : ""} · {feat.readingMinutes}{" "}
              min read
            </span>
            <Link className="cx-btn cx-btn-p" href={guideUrl(feat.slug)}>
              Read the guide
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </section>
      )}

      <section className="container hl-all" aria-labelledby="hl-all-h">
        <h2 id="hl-all-h">All guides</h2>
        <LibraryList posts={rows} />
        {rows.length > 12 && <LibraryMore />}
      </section>

      {shelves.map(({ g, items }) => (
        <section key={g.id} className="container hl-shelf" aria-labelledby={`hl-shelf-${g.id}`}>
          <div className="hl-shelf-h">
            <h3 id={`hl-shelf-${g.id}`}>{g.label}</h3>
            <Link href={`/conditions/#g-${g.id}`}>See the condition page</Link>
          </div>
          <div className="gd-keep-grid">
            {items.map((p) => (
              <GuideCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ))}

      <div className="container hl-bandwrap">
        <div className="ctaband">
          <h3>Have a question you want answered?</h3>
          <p>
            Many guides start from questions patients ask in clinic. Ask yours at your next
            visit.
          </p>
          <div className="btns">
            <BookButton onDark label="Book appointment" />
            <a
              className="btn wa-btn"
              href={whatsappLink("a question from the Health Library")}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
