import Link from "next/link";
import { isDraftPost, publishedPostMeta } from "@/lib/content";
import { dateMark, featuredPost, guideUrl, sortNewest, topicOf } from "@/lib/library";
import { GuideCover } from "@/components/page/GuideCover";
import { Icon } from "@/lib/icons";

/**
 * Home "Health Library" section: the featured guide on the left, the two next
 * guides as dated lines on the right. No autoplay, no arrows, no dots.
 */
export function LibraryHighlights() {
  const posts = publishedPostMeta();
  const feat = featuredPost(posts);
  if (!feat) return null;
  const rest = sortNewest(posts)
    .filter((p) => p.slug !== feat.slug)
    .slice(0, 2);
  const featTopic = topicOf(feat);

  return (
    <section className="sec hl-home-sec">
      <div className="container">
        <div className="hl-sec-h">
          <div className="sec-h">
            <span className="eyebrow">Health Library</span>
            <h2>
              Understand your health, <em className="acc">in plain words</em>
            </h2>
          </div>
          <Link className="hl-home-all" href="/health-library/">
            All guides
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="hl-home">
          <Link className="hl-home-feat" href={guideUrl(feat.slug)}>
            <span className="hl-home-img">
              <GuideCover post={feat} sizes="(max-width: 900px) 100vw, 620px" />
              {isDraftPost(feat) && <span className="draft-chip">Draft</span>}
            </span>
            <span className="hl-home-txt">
              <span className="hl-topic">{featTopic.label}</span>
              <b>{feat.heading}</b>
              <span className="hl-stand">{feat.standfirst}</span>
            </span>
          </Link>
          <div className="hl-home-items">
            {rest.map((p) => {
              const t = topicOf(p);
              const m = dateMark(p.date);
              return (
                <Link key={p.slug} className="hl-home-item" href={guideUrl(p.slug)}>
                  <span className="hl-meta-top">
                    {m ? `${m.day} ${m.my} · ` : ""}
                    <span className="hl-topic">{t.label}</span>
                    {isDraftPost(p) && <span className="draft-chip">Draft</span>}
                  </span>
                  <b>{p.heading}</b>
                  <span className="hl-item-meta">{p.readingMinutes} min read</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
