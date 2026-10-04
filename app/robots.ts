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
        disallow: ["/styleguide/", "/thank-you/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
