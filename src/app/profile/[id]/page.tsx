import { eq } from 'drizzle-orm'
import ReviewDisplay from '@/components/reviews/review-display'
import { db } from '@/lib/db'
import { reviewTable } from '@/lib/db/schema'

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params
  const reviews = await db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.userId, id))

  return (
    <div className="max-w-2xl md:col-span-2">
      <ReviewDisplay
        write={false}
        entity_id="profile"
        entity_type="user"
        reviews={reviews}
        indicators={[]}
      />
    </div>
  )
}
