import ResourceListWithFilters from '@/components/resource-list-with-filters'
import { db } from '@/lib/db'
import { resourceTable } from '@/lib/db/schema'

export default async function Page() {
  const resources = await db.select().from(resourceTable)

  // Extract unique values for filters
  const uniqueStates = Array.from(new Set(resources.map((r) => r.state))).sort()
  const uniqueCountries = Array.from(
    new Set(resources.map((r) => r.country)),
  ).sort()
  const uniqueCategories = Array.from(
    new Set(resources.map((r) => r.category)),
  ).sort()

  return (
    <ResourceListWithFilters
      resources={resources}
      states={uniqueStates}
      countries={uniqueCountries}
      categories={uniqueCategories}
    />
  )
}
