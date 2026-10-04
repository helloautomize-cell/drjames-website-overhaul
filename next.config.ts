import type { NextConfig } from "next";

const siteIndexable = process.env.SITE_INDEXABLE === "true";

const nextConfig: NextConfig = {
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
      { source: "/category/uncategorized", destination: "/health-library/", permanent: true },
      { source: "/author/:path*", destination: "/health-library/", permanent: true },
      // Old condition/service stubs land on the hub
      { source: "/services/:path*", destination: "/conditions/", permanent: true },
    ];
  },
  async headers() {
    return [
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
        ],
      },
    ];
  },
};

export default nextConfig;
