import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile/", "/sign-out/"],
    },
    sitemap: "https://accuguide.org/sitemap.xml",
  };
}
