import { StarIcon } from 'lucide-react'
import ReviewWrite from './review-write'
import IndicatorDisplay from './indicator-display'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { checkAuth } from '@/lib/session'
import { getUserInfosByIds } from '@/lib/user-info'
import { getSignedUrlForKey } from '@/lib/s3/functions'
import { cn } from '@/lib/utils'

interface Review {
  id: string
  userId: string
  entityId: string
  rating: number
  comment: string
  createdAt: Date | string
}

interface Indicator {
  id: string
  reviewId: string
  indicator: string
  exists: boolean | null
}

export default async function ReviewDisplay({
  entity_id,
  entity_type,
  reviews,
  indicators,
  write = true,
}: {
  entity_id: string
  entity_type: string
  reviews: Review[]
  indicators: Indicator[]
  write?: boolean
}) {
  function stars(rating: number) {
    return (
      <div className="flex my-1 w-24">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={` w-4 ${star <= rating ? 'text-yellow-500' : ''}`}
            fill={star <= rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    )
  }

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const authenticated = await checkAuth()

  // Get all unique userIds from reviews
  const userIds = Array.from(new Set(reviews.map((r) => r.userId)))
  const userInfoMap = await getUserInfosByIds(userIds)

  // Preload signed URLs for all user images
  const userImageUrls: Record<string, string | undefined> = {}
  await Promise.all(
    userIds.map(async (id) => {
      const imageKey = userInfoMap[id]?.image
      if (imageKey) {
        userImageUrls[id] = await getSignedUrlForKey(imageKey)
      }
    }),
  )

  return (
    <div>
      {write && <h2>Reviews</h2>}
      {write && (
        <ReviewWrite
          entity_id={entity_id}
          entity_type={entity_type}
          auth={authenticated ? true : false}
        />
      )}
      <div className={cn(write ? 'mt-4' : '')}>
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="py-2 border-slate-600 dark:border-slate-400 border-b-2"
          >
            {write && (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={userImageUrls[review.userId]}
                    alt="user profile image"
                  />
                  <AvatarFallback>
                    {userInfoMap[review.userId]?.name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold">
                  {userInfoMap[review.userId]?.name || 'Unknown'}
                </p>
              </div>
            )}
            <div className="text-sm">{stars(review.rating)}</div>
            <IndicatorDisplay indicators={indicators} reviewId={review.id} />
            <p className="text-sm">{review.comment}</p>
            <p className="text-xs mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
