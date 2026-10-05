import { isDraftPost, publishedPostMeta } from "@/lib/content";
import { guideAbsUrl, sortNewest, topicOf } from "@/lib/library";
import { site } from "@/lib/site-config";
import { SITE_URL } from "@/lib/seo";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** RSS 2.0 feed: the newest 30 published guides (drafts never appear). */
export function GET() {
  const items = sortNewest(publishedPostMeta())
    .filter((p) => !isDraftPost(p))
    .slice(0, 30);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(`${site.name} - Health Library`)}</title>
<link>${SITE_URL}/health-library/</link>
<atom:link href="${SITE_URL}/health-library/rss.xml" rel="self" type="application/rss+xml"/>
<description>Plain-language guides on the conditions Dr. James sees most, written and reviewed by him.</description>
<language>en-om</language>
${items
  .map(
    (p) => `<item>
<title>${esc(p.heading)}</title>
<link>${guideAbsUrl(p.slug)}</link>
<guid isPermaLink="true">${guideAbsUrl(p.slug)}</guid>
<description>${esc(p.standfirst)}</description>
<category>${esc(topicOf(p).label)}</category>
<pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
</item>`,
  )
  .join("\n")}
</channel>
</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
