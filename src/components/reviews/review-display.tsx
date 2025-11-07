import { getSignedUrlForKey } from '@/lib/s3/functions'
import { checkAuth } from '@/lib/session'
import { Indicator, Review } from '@/lib/types'
import { getUserInfosByIds } from '@/lib/user-info'
import { cn } from '@/lib/utils'
import ReviewItem from './review-item'
import ReviewWrite from './review-write'

export default async function ReviewDisplay({
  entity_id,
  entity_type,
  reviews,
  indicators,
  write = true,
  profile = true,
}: {
  entity_id: string
  entity_type: string
  reviews: Review[]
  indicators: Indicator[]
  write?: boolean
  profile?: boolean
}) {
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
      {write && <h2 className="text-2xl mb-4 mt-6">Reviews</h2>}
      {write && (
        <ReviewWrite
          entity_id={entity_id}
          entity_type={entity_type}
          auth={authenticated ? true : false}
        />
      )}
      <div className={cn(write ? 'mt-4' : '')}>
        {sortedReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            indicators={indicators}
            userInfo={userInfoMap[review.userId] || {}}
            userImageUrl={userImageUrls[review.userId]}
            profile={profile}
            isOwner={
              authenticated ? authenticated.user.id === review.userId : false
            }
            showUserInfo={write}
          />
        ))}
      </div>
    </div>
  )
}
