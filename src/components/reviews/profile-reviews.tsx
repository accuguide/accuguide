import { db } from '@/lib/db'
import ReviewDisplay from '@/components/reviews/review-display'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { reviewTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getServerUser } from '@/lib/session'

export default async function ProfileReview() {
  const user = await getServerUser()
  const userId = user?.id || ''
  const reviews = await db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.userId, userId))
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reviews</CardTitle>
        <CardDescription>View and manage your reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <ReviewDisplay
          write={false}
          entity_id="profile"
          entity_type="user"
          reviews={reviews}
          indicators={[]}
        />
      </CardContent>
    </Card>
  )
}
