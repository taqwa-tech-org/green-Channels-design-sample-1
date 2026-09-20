import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const routes = [
  "",
  "/workwear-uniforms",
  "/capabilities",
  "/quality",
  "/about",
  "/start-a-project",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/start-a-project" ? 0.9 : 0.7,
  }));
}
