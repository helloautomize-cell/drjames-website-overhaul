import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";
import { LibrarySearch } from "@/components/page/LibrarySearch";
import { LibraryTabs } from "@/components/page/LibraryTabs";
import { ClCard, ClusterSection } from "@/components/page/ClusterGuides";
import { BookButton } from "@/components/BookButton";
import { publishedPostMeta } from "@/lib/content";
import { clusterPosts } from "@/lib/clusters";
import { sortNewest } from "@/lib/library";
import { whatsappLink } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/seo";
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

export const metadata: Metadata = {
  ...pageMeta(
    "Health Library",
    "Plain-language health guides written and reviewed by Dr. James — covering diabetes, blood pressure, thyroid, liver, kidneys, sleep and gut health.",
    "/health-library/",
  ),
  alternates: {
    canonical: `${SITE_URL}/health-library/`,
    types: { "application/rss+xml": `${SITE_URL}/health-library/rss.xml` },
  },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Health Library" }];

export default function LibraryPage() {
  const posts = publishedPostMeta();
  const clusters = clusterPosts(posts);
  const older = sortNewest(posts.filter((p) => p.cluster == null));

  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
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

      {posts.length > 0 && <LibraryTabs posts={posts} active="all" />}

      <div id="hl-clusters">
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
      </div>

      <section id="hl-results" className="container cl-sec" hidden aria-label="Search results">
        <div className="cl-grid">
          {posts.map((p) => (
            <ClCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <div className="container">
        <div className="hl-empty" id="hl-empty" hidden>
          <p>No guides match. Ask Dr. James at your next visit.</p>
          <BookButton label="Book a consultation" />
        </div>
      </div>

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
