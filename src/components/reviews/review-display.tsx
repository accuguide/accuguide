import { getProfileImage, getReviewImages } from '@/lib/s3/functions'
import { checkAuth } from '@/lib/session'
import { Image, Indicator, Review } from '@/lib/types'
import { getUserInfosByIds } from '@/lib/user-info'
import { cn } from '@/lib/utils'
import ReviewItem from './review-item'
import ReviewWrite from './review-write'

export default async function ReviewDisplay({
  entity_id,
  entity_type,
  reviews,
  indicators,
  imageURLs,
  write = true,
  profile = true,
}: {
  entity_id: string
  entity_type: string
  reviews: Review[]
  indicators: Indicator[]
  imageURLs?: Image[]
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
        userImageUrls[id] = await getProfileImage(imageKey)
      }
    }),
  )

  // Fetch signed URLs for review images and map them by reviewId
  const reviewImageUrls: Record<string, string[]> = {}
  if (imageURLs && imageURLs.length > 0) {
    const keys = imageURLs.map((img) => img.image)
    const signedUrls = await getReviewImages(keys)
    imageURLs.forEach((img, index) => {
      if (!reviewImageUrls[img.reviewId]) {
        reviewImageUrls[img.reviewId] = []
      }
      reviewImageUrls[img.reviewId].push(signedUrls[index])
    })
  }

  return (
    <div>
      {write && <h2 className="mt-6 mb-4 text-2xl">Reviews</h2>}
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
            reviewImageUrls={reviewImageUrls[review.id] || []}
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
