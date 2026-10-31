import Link from "next/link";
import { isPublished, type PostMeta } from "@/lib/content";
import { fmtDate, guideUrl, topicOf } from "@/lib/library";
import { GuideCover } from "./GuideCover";
import { BookButton } from "@/components/BookButton";
import { Icon } from "@/lib/icons";

const PAGE = 12;

/**
 * Guide ledger rows for the crawlable /health-library/page/n/ routes.
 */
export function LibraryList({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <div className="hl-rows" id="hl-list">
        {posts.map((p, i) => {
          const t = topicOf(p);
          const reviewed = isPublished(p) ? fmtDate(p.reviewedOn) : null;
          const extra = i >= PAGE;
          return (
            <Link
              key={p.slug}
              className="hl-row"
              href={guideUrl(p.slug)}
              {...(extra ? { "data-extra": "", hidden: true } : {})}
            >
              <span className="hl-thumb">
                <GuideCover post={p} sizes="(max-width: 760px) 120px, 220px" />
                {!isPublished(p) && <span className="draft-chip">Draft</span>}
              </span>
              <span className="hl-txt">
                <span className="hl-meta-top">
                  <span className="hl-topic">{t.label}</span>
                </span>
                <b>{p.heading}</b>
                <span className="hl-stand">{p.standfirst}</span>
                <span className="hl-meta">
                  {reviewed ? `Reviewed ${reviewed} · ` : ""}
                  {p.readingMinutes} min read
                </span>
              </span>
              <span className="hl-go" aria-hidden="true">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          );
        })}
      </div>
      <div className="hl-empty" id="hl-empty" hidden>
        <p>No guides match. Ask Dr. James at your next visit.</p>
        <BookButton label="Book a consultation" />
      </div>
    </>
  );
}
