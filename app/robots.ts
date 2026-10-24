import type { MetadataRoute } from "next";
import { SITE_URL, siteIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!siteIndexable) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you/"],
      },
      {
        // AI crawlers are explicitly welcome to read the site
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/thank-you/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
