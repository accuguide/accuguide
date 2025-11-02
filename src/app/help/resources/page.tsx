import ResourceCard from '@/components/resource-card'
import { db } from '@/lib/db'
import { resourceTable } from '@/lib/db/schema'

export default async function Page() {
  const resources = await db.select().from(resourceTable)

  return (
    <div>
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          title={resource.title}
          description={resource.description}
          link={resource.url}
          state={resource.state}
          country={resource.country}
          updatedAt={resource.updatedAt.toDateString()}
        />
      ))}
    </div>
  )
}
