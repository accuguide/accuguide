import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'
import { createSitemapUrlSet } from '@/lib/sitemap'
export const dynamic = 'force-dynamic'
export async function GET() {
  const urls = [
    '/',
    '/help/faq/',
    '/help/resources/',
    '/help/feedback/',
    '/info/about/',
    '/info/donate/',
    '/legal/disclaimers/',
    '/legal/privacy/',
    '/legal/terms/',
    '/search/',
    '/sign-in/',
    '/sign-in/password/forgot/',
    '/sign-up/',
    '/unsubscribe/',
  ]

  const entities = await db
    .select({
      id: entityTable.id,
      createdAt: entityTable.createdAt,
    })
    .from(entityTable)

  const entityUrls = entities.map((entity) => {
    return {
      slug: `/entity/${entity.id}/`,
      lastmod: entity.createdAt.toISOString(),
    }
  })

  const staticUrls = urls.map((url) => {
    return {
      slug: url,
      lastmod: new Date().toISOString(),
    }
  })

  const allUrls = [...staticUrls, ...entityUrls]
  const sitemap = createSitemapUrlSet(allUrls)

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
