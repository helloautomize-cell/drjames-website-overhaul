import Link from "next/link";
import { conditionGroups } from "@/lib/conditions";
import type { PostMeta } from "@/lib/content";

/**
 * Topic tabs: real links so every topic has an indexable page. Topics with
 * no guides are not shown. Sticky under the header once the masthead scrolls.
 */
export function LibraryTabs({ posts, active }: { posts: PostMeta[]; active: string }) {
  const topics = conditionGroups
    .map((g) => ({ g, n: posts.filter((p) => p.topic === g.id).length }))
    .filter((x) => x.n > 0);
  return (
    <nav className="hl-tabs" aria-label="Guides by topic">
      <ul className="container">
        <li>
          <Link
            href="/health-library/"
            className={active === "all" ? "on" : undefined}
            aria-current={active === "all" ? "page" : undefined}
          >
            All <small>{posts.length}</small>
          </Link>
        </li>
        {topics.map(({ g, n }) => (
          <li key={g.id}>
            <Link
              href={`/health-library/topic/${g.id}/`}
              className={active === g.id ? "on" : undefined}
              aria-current={active === g.id ? "page" : undefined}
            >
              {g.label} <small>{n}</small>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
