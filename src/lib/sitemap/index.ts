/**
 * Update this with the domain of your site
 */
const Config = {
  domain: "https://accuguide.org",
};

export interface Page {
  slug: string;
  lastmod: string;
}

export const createSitemapUrlSet = (pages: Page[]): string => {
  const urlSet = pages
    .map(
      (page) =>
        `<url>
        <loc>${Config.domain}${page.slug}</loc>
        <lastmod>${page.lastmod}</lastmod>
      </url>`,
    )
    .join("");

  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlSet}
    </urlset>`;
};
