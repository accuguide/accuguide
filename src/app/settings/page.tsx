import { eq } from 'drizzle-orm'
import ReviewDisplay from '@/components/reviews/review-display'
import Settings from '@/components/settings/settings'
import { db } from '@/lib/db'
import { reviewTable } from '@/lib/db/schema'
import { getServerUser } from '@/lib/session'

export default async function Page() {
  const user = await getServerUser()
  const userId = user?.id || ''
  const reviews = await db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.userId, userId))

  return (
    <div className="mx-auto max-w-7xl">
      <div className="space-y-12">
        <Settings />

        {/* Profile Review Section */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold">Reviews</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              View and manage your reviews.
            </p>
          </div>

          <div className="max-w-2xl md:col-span-2">
            <ReviewDisplay
              write={false}
              entity_id="profile"
              entity_type="user"
              reviews={reviews}
              indicators={[]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
