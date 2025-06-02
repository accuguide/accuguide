import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/settings/", "/login/google/callback/"],
    },
    sitemap: "https://accuguide.org/sitemap.xml",
  };
}
