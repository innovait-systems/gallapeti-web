import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", "/support", "/delete-data"].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date("2026-09-29") }));
}
