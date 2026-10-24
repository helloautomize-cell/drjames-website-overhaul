import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.title}`,
    short_name: site.shortName,
    description: `${site.title} at ${site.hospital}, Muscat, Oman.`,
    start_url: "/",
    display: "browser",
    background_color: "#FBF7F0",
    theme_color: "#0A1C2E",
    icons: [
      { src: "/favicon.ico", sizes: "32x38", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x212", type: "image/png" },
    ],
  };
}
