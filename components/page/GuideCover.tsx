import Image from "next/image";
import { CONTOURS } from "@/lib/contours";
import { Icon } from "@/lib/icons";
import { mainCondition, topicOf } from "@/lib/library";
import type { PostMeta } from "@/lib/content";

/** Pearl-toned 1px placeholder so covers get placeholder="blur" without a build step. */
const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsaGj4DwAFhAJ/0eE8mQAAAABJRU5ErkJggg==";

/**
 * A guide's cover frame. Real covers render through the shared warm grade +
 * paper-grain art direction; posts without an image get the designed fallback
 * (night panel, gold contours, the main condition's icon, topic name).
 * The parent sets the aspect ratio; this block fills it.
 */
export function GuideCover({
  post,
  sizes,
  priority = false,
}: {
  post: PostMeta;
  sizes: string;
  /** preloads the cover — only for the one LCP candidate on a page */
  priority?: boolean;
}) {
  const cond = mainCondition(post);
  const topic = topicOf(post);
  return (
    <span className="gd-cover">
      {post.image ? (
        <>
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            sizes={sizes}
            quality={80}
            placeholder="blur"
            blurDataURL={BLUR}
            preload={priority}
            style={{ objectFit: "cover", objectPosition: post.imageFocus }}
          />
        </>
      ) : (
        <span className="gd-cover-fb" aria-hidden="true">
          <svg
            className="gd-cover-lines"
            viewBox="0 0 800 280"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
          >
            {CONTOURS.map((c, i) => (
              <path key={i} d={c.d} />
            ))}
          </svg>
          <span className="gd-cover-badge">
            <Icon name={cond?.icon ?? topic.icon} size={40} />
          </span>
          <span className="gd-cover-topic">{topic.label}</span>
        </span>
      )}
    </span>
  );
}
