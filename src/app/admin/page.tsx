import { revalidatePath } from 'next/cache'
import AdminInfo from '@/components/admin/admin-info'
import { db } from '@/lib/db'
import {
  categoryTable,
  FaqTable,
  indicatorTable,
  jobTable,
  resourceTable,
  typeIndicatorTable,
  typeMappingTable,
  typeTable,
} from '@/lib/db/schema'
import { getServerUser } from '@/lib/session'

export default async function Page() {
  const types = await db.select().from(typeTable)
  const indicators = await db.select().from(indicatorTable)
  const categories = await db.select().from(categoryTable)
  const typeMappings = await db.select().from(typeMappingTable)
  const typeIndicators = await db.select().from(typeIndicatorTable)
  const resources = await db.select().from(resourceTable)
  const faqs = await db.select().from(FaqTable)
  const jobs = await db.select().from(jobTable)
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

  async function categorySubmit(category: string) {
    'use server'
    await db.insert(categoryTable).values({ category: category })
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

  async function resourceSubmit(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const url = formData.get('url') as string
    const category = formData.get('category') as string
    const state = formData.get('state') as string
    const country = formData.get('country') as string

    await db.insert(resourceTable).values({
      title,
      description,
      url,
      category,
      state,
      country,
    })
    revalidatePath('/admin')
  }

  async function faqSubmit(question: string, answer: string) {
    'use server'
    await db.insert(FaqTable).values({
      question,
      answer,
    })
    revalidatePath('/admin')
  }

  async function jobSubmit(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const responsibilities = JSON.parse(
      formData.get('responsibilities') as string,
    ) as string[]
    const link = formData.get('link') as string

    await db.insert(jobTable).values({
      title,
      description,
      responsibilities,
      link,
    })
    revalidatePath('/admin')
  }

  async function typeMappingSubmit(type: string, pattern: string) {
    'use server'
    await db.insert(typeMappingTable).values({
      type,
      pattern,
    })
    revalidatePath('/admin')
  }

  async function typeIndicatorSubmit(type: string, indicator: string) {
    'use server'
    await db.insert(typeIndicatorTable).values({
      type,
      indicator,
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
        resources={resources}
        faqs={faqs}
        jobs={jobs}
        typeSubmit={typeSubmit}
        categorySubmit={categorySubmit}
        indicatorSubmit={indicatorSubmit}
        resourceSubmit={resourceSubmit}
        faqSubmit={faqSubmit}
        jobSubmit={jobSubmit}
        typeMappingSubmit={typeMappingSubmit}
        typeIndicatorSubmit={typeIndicatorSubmit}
      />
    </div>
  )
}
