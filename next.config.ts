import type { NextConfig } from "next";

const siteIndexable = process.env.SITE_INDEXABLE === "true";

/**
 * Content-Security-Policy (section 8.5). Third parties are only the
 * consent/click-gated ones: GA4 (after cookie consent), Turnstile
 * (only when keys are configured), Google Maps (click-to-load frame),
 * Vercel Speed Insights (first-party /_vercel endpoints).
 */
const csp = [
  "default-src 'self'",
  // unsafe-eval only in dev — Turbopack HMR needs it; production stays strict
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://challenges.cloudflare.com",
  "frame-src https://www.google.com https://maps.google.com https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  // [CONFIRM] chips render in dev and preview builds only; inlined so client components see it too
  env: { NEXT_PUBLIC_SHOW_CONFIRM: process.env.VERCEL_ENV === "production" ? "0" : "1" },
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Old WordPress URLs -> new structure (section 8.6)
      { source: "/about", destination: "/about-dr-james/", permanent: true },
      { source: "/services", destination: "/conditions/", permanent: true },
      { source: "/appointment", destination: "/contact/", permanent: true },
      { source: "/blog", destination: "/health-library/", permanent: true },
      {
        source: "/heart-disease-warning-signs",
        destination: "/health-library/heart-disease-warning-signs/",
        permanent: true,
      },
      {
        source: "/sleep-disorders",
        destination: "/health-library/sleep-disorders/",
        permanent: true,
      },
      {
        source: "/common-digestive-problems",
        destination: "/health-library/common-digestive-problems/",
        permanent: true,
      },
      { source: "/plan-your-visit", destination: "/your-visit/", permanent: true },
      { source: "/category/uncategorized", destination: "/health-library/", permanent: true },
      { source: "/author/:path*", destination: "/health-library/", permanent: true },
      // Old condition/service stubs land on the hub
      { source: "/services/:path*", destination: "/conditions/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // public/ assets are not content-hashed — cache 30d, not immutable
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          // Belt-and-braces noindex until launch alongside meta robots
          ...(siteIndexable
            ? []
            : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
