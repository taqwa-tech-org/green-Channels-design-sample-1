import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Crawler policy. Search and AI-search crawlers are explicitly welcome:
 * being cited by AI search is a build-time decision, not something added later.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
