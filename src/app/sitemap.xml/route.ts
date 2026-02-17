import { db } from '@/lib/db'
import { user } from '@/lib/db/auth-schema'
import { entityTable } from '@/lib/db/schema'
import { createSitemapUrlSet } from '@/lib/sitemap'
export const dynamic = 'force-dynamic'
export async function GET() {
  const urls = [
    '/',
    '/contact',
    '/help/faq',
    '/help/resources',
    '/help/feedback',
    '/info/about',
    '/info/donate',
    '/info/volunteer',
    '/legal/accessibility',
    '/legal/disclaimers',
    '/legal/privacy',
    '/legal/terms',
    '/search',
    '/sign-in',
    '/sign-in/password/forgot',
    '/sign-up',
  ]

  const entities = await db
    .select({
      id: entityTable.id,
      createdAt: entityTable.createdAt,
    })
    .from(entityTable)

  const profiles = await db
    .select({
      id: user.id,
      createdAt: user.createdAt,
    })
    .from(user)

  const entityUrls = entities.map((entity) => {
    return {
      slug: `/entity/${entity.id}`,
      lastmod: entity.createdAt.toISOString(),
    }
  })

  const profileUrls = profiles.map((profile) => {
    return {
      slug: `/profile/${profile.id}`,
      lastmod: profile.createdAt.toISOString(),
    }
  })

  const staticUrls = urls.map((url) => {
    return {
      slug: url,
      lastmod: new Date().toISOString(),
    }
  })

  const allUrls = [...staticUrls, ...entityUrls, ...profileUrls]
  const sitemap = createSitemapUrlSet(allUrls)

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
