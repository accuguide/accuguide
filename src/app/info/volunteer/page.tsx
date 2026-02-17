import JobCard from '@/components/job-card'
import { db } from '@/lib/db'
import { jobTable } from '@/lib/db/schema'

export default async function Page() {
  const positions = await db.select().from(jobTable)
  return (
    <div className="grid grid-cols-1">
      {positions.map((position) => (
        <JobCard key={position.id} {...position} />
      ))}
    </div>
  )
}
