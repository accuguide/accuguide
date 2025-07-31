import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import {
  categoryTable,
  indicatorTable,
  typeIndicatorTable,
  typeMappingTable,
  typeTable,
} from '@/lib/db/schema'
import { getServerUser } from '@/lib/session'
import AdminInfo from './admin-info'

export default async function Page() {
  const types = await db.select().from(typeTable)
  const indicators = await db.select().from(indicatorTable)
  const categories = await db.select().from(categoryTable)
  const typeMappings = await db.select().from(typeMappingTable)
  const typeIndicators = await db.select().from(typeIndicatorTable)
  const links = [
    {
      label: 'Analytics',
      href: 'https://analytics.accuguide.org',
    },
    {
      label: 'Supabase',
      href: 'https://supabase.com/dashboard/project/prslntquvktjztbiamcl',
    },
  ]
  const user = await getServerUser()
  if (user?.role !== 'admin') {
    return <div>You do not have permission to access this page.</div>
  }

  async function typeSubmit(type: string) {
    'use server'
    await db.insert(typeTable).values({ type: type })
    await db.insert(typeMappingTable).values({ type: type, pattern: type })
    revalidatePath('/admin')
  }

  async function indicatorSubmit(
    indicator: string,
    description: string,
    category: string,
  ) {
    'use server'
    await db.insert(indicatorTable).values({
      indicator: indicator,
      description: description,
      category: category,
    })
    revalidatePath('/admin')
  }

  return (
    <div>
      <AdminInfo
        links={links}
        types={types}
        indicators={indicators}
        categories={categories}
        typeMappings={typeMappings}
        typeIndicators={typeIndicators}
        typeSubmit={typeSubmit}
        indicatorSubmit={indicatorSubmit}
      />
    </div>
  )
}
