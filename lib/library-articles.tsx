import { postMeta } from "@/lib/content";
import { allConditions } from "@/lib/conditions";
import { Confirm } from "@/components/Confirm";
import type { IconName } from "@/lib/icons";
import type { LibraryArticle } from "@/components/LibraryCarousel";

/** Maps published Health Library posts to carousel cards. Server-side only. */
export function libraryArticles(): LibraryArticle[] {
  return postMeta().map((p) => ({
    slug: p.slug,
    icon: (allConditions.find((c) => c.slug === p.related[0])?.icon ?? "heart") as IconName,
    cat: p.category,
    title: p.title,
    meta: (
      <>
        Written by Dr. James · <Confirm>{p.date}</Confirm> · {p.readingMinutes} min read
      </>
    ),
    blurb: p.description,
  }));
}
