import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { postMeta } from "@/lib/content";
import { site } from "@/lib/site-config";
import { Confirm } from "@/components/Confirm";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Health Library",
  "Plain-language articles on the conditions Dr. James sees most, reviewed by him before publication. Heart, sleep, gut health and more.",
  "/health-library/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "Health Library" }];

export default function LibraryPage() {
  const posts = postMeta();
  const categories = [...new Set(posts.map((p) => p.category))];
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
      <PageHero
        crumbs={crumbs}
        title="Health Library"
        intro={
          <>
            Plain-language articles on the conditions we see most. Every article is
            medically reviewed by Dr. James before it is published. Publish date{" "}
            <Confirm>[CONFIRM]</Confirm>
          </>
        }
      />
      <div className="container">
        <div className="chipset" style={{ paddingTop: 28 }}>
          {categories.map((c) => (
            <span className="chip" key={c}>
              {c}
            </span>
          ))}
        </div>
        <div className="lgrid">
          {posts.map((p) => (
            <Link className="lcard" key={p.slug} href={`/health-library/${p.slug}/`}>
              <span className="cov" aria-hidden="true">
                {p.category}
              </span>
              <span className="body">
                <span className="cat">{p.category}</span>
                <h2>{p.heading}</h2>
                <p>{p.description}</p>
                <span className="meta">
                  <Image
                    src="/images/doctor/dr-james-avatar.jpg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  {site.shortName} · {p.readingMinutes} min read
                </span>
              </span>
            </Link>
          ))}
        </div>
        <div style={{ paddingBottom: 64 }}>
          <CtaBand />
        </div>
      </div>
    </main>
  );
}
