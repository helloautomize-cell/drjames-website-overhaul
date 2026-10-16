import Link from "next/link";
import { isDraftPost, isPublished, type PostMeta } from "@/lib/content";
import { fmtDate, guideUrl, topicOf } from "@/lib/library";
import { GuideCover } from "./GuideCover";

/** Compact guide card: 4:3 cover, topic caps, serif heading, review meta. */
export function GuideCard({ post }: { post: PostMeta }) {
  const topic = topicOf(post);
  const reviewed = isPublished(post) ? fmtDate(post.reviewedOn) : null;
  return (
    <Link className="gd-card" href={guideUrl(post.slug)}>
      <span className="gd-card-img">
        <GuideCover post={post} sizes="(max-width: 700px) 90vw, 340px" />
        {!isPublished(post) && <span className="draft-chip">Draft</span>}
      </span>
      <span className="gd-card-body">
        <span className="gd-card-topic">{topic.label}</span>
        <b>{post.heading}</b>
        <span className="gd-card-meta">
          {reviewed ? `Reviewed ${reviewed} · ` : ""}
          {post.readingMinutes} min read
        </span>
      </span>
    </Link>
  );
}
