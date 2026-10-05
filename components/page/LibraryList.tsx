import Link from "next/link";
import { isDraftPost, type PostMeta } from "@/lib/content";
import { dateMark, fmtDate, guideUrl, searchText, topicOf } from "@/lib/library";
import { GuideCover } from "./GuideCover";
import { BookButton } from "@/components/BookButton";
import { Icon } from "@/lib/icons";

const PAGE = 12;

/**
 * The "All guides" ledger rows. Rows past the first page are server-rendered
 * but hidden behind data-extra so LibrarySearch and LibraryMore can reveal
 * them without a reload (crawlers use /health-library/page/n/).
 */
export function LibraryList({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <div className="hl-rows" id="hl-list">
        {posts.map((p, i) => {
          const t = topicOf(p);
          const mark = dateMark(p.date);
          const reviewed = fmtDate(p.lastReviewed);
          const extra = i >= PAGE;
          return (
            <Link
              key={p.slug}
              className="hl-row"
              href={guideUrl(p.slug)}
              data-q={searchText(p)}
              {...(extra ? { "data-extra": "", hidden: true } : {})}
            >
              <span className="hl-date">
                {mark ? (
                  <>
                    <b className="num">{mark.day}</b>
                    <span>{mark.my}</span>
                  </>
                ) : (
                  isDraftPost(p) && <span className="draft-chip">Draft</span>
                )}
              </span>
              <span className="hl-thumb">
                <GuideCover post={p} sizes="(max-width: 760px) 96px, 200px" />
              </span>
              <span className="hl-txt">
                <span className="hl-meta-top">
                  {mark ? (
                    <span className="hl-date-m num">
                      {mark.day} {mark.my} ·{" "}
                    </span>
                  ) : isDraftPost(p) ? (
                    <span className="hl-date-m">
                      <span className="draft-chip">Draft</span>{" "}
                    </span>
                  ) : null}
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
