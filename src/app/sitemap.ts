import { db } from "@/db";
import { entityTable } from "@/db/schema";

export default async function sitemap() {
  const urls = [
    "",
    "/about",
    "/help/faq",
    "/help/resources",
    "/legal/privacy",
    "/legal/terms",
    "/login",
    "/search",
  ];
  const lastModifiedDate = new Date("2025-05-03").toISOString();

  const entities = await db
    .select({
      id: entityTable.id,
      createdAt: entityTable.createdAt,
    })
    .from(entityTable);

  const entityUrls = entities.map((entity) => {
    return {
      url: `https://accessfinder.org/entity/${entity.id}`,
      lastModified: entity.createdAt.toISOString(),
    };
  });

  const staticUrls = urls.map((url) => {
    return {
      url: `https://accessfinder.org${url}`,
      lastModified: lastModifiedDate,
    };
  });

  return [...staticUrls, ...entityUrls];
}
