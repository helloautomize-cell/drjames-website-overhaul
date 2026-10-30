import Link from "next/link";
import { isPublished, type PostMeta } from "@/lib/content";
import { fmtDate, guideUrl, topicOf } from "@/lib/library";
import type { Cluster } from "@/lib/clusters";
import { GuideCover } from "./GuideCover";
import { Icon } from "@/lib/icons";

/** Reviewed-date line shared by every library card. */
function metaLine(p: PostMeta): string {
  const reviewed = isPublished(p) ? fmtDate(p.reviewedOn) : null;
  return `${reviewed ? `Reviewed ${reviewed} · ` : ""}${p.readingMinutes} min read`;
}

/**
 * Compact guide card: 16:9 cover on top, title (max 3 lines) and the
 * reviewed line below. The whole card is the link.
 */
export function ClCard({ post }: { post: PostMeta }) {
  return (
    <Link className="cl-card" href={guideUrl(post.slug)}>
      <span className="cl-card-img">
        <GuideCover
          post={post}
          sizes="(max-width: 699px) 94vw, (max-width: 1099px) 30vw, 220px"
        />
        {!isPublished(post) && <span className="draft-chip">Draft</span>}
      </span>
      <span className="cl-card-body">
        <b>{post.heading}</b>
        <span className="cl-card-meta">{metaLine(post)}</span>
      </span>
    </Link>
  );
}

/**
 * One cluster section: the pillar as a wide feature card with its five
 * support guides in a single row below.
 */
export function ClusterSection({ cluster }: { cluster: Cluster }) {
  const { pillar } = cluster;
  const topic = topicOf(pillar);
  return (
    <section className="container cl-sec" aria-labelledby={`cl-h-${cluster.n}`}>
      <div className="cl-head">
        <h2 id={`cl-h-${cluster.n}`}>{cluster.name}</h2>
      </div>
      <div className="cl-pillar">
        <Link
          className="cl-pillar-img"
          href={guideUrl(pillar.slug)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <GuideCover
            post={pillar}
            sizes="(max-width: 1099px) 94vw, 560px"
          />
          {!isPublished(pillar) && <span className="draft-chip">Draft</span>}
        </Link>
        <div className="cl-pillar-txt">
          <span className="hl-topic">{topic.label}</span>
          <h3>
            <Link href={guideUrl(pillar.slug)}>{pillar.heading}</Link>
          </h3>
          <p>{pillar.standfirst}</p>
          <span className="cl-meta">{metaLine(pillar)}</span>
          <Link className="cx-btn cx-btn-p" href={guideUrl(pillar.slug)}>
            Read the guide
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
      <div className="cl-row">
        {cluster.supports.map((p) => (
          <ClCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
