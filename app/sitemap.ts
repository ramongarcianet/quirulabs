import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || "https://quirulabs.com"; return [{ url: base, changeFrequency: "monthly", priority: 1 }, { url: `${base}/projects/agent-platform`, changeFrequency: "monthly", priority: .7 }]; }
