import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  ReviewIndicator,
  reviewIndicatorTable,
  reviewTable,
} from '@/lib/db/schema'
import { uploadReviewImage } from '@/lib/s3/functions'
import { getServerUser } from '@/lib/session'

export async function POST(request: Request) {
  const user = await getServerUser()
  const formData = await request.formData()
  
  const entity_id = formData.get('entity_id') as string
  const review_id = formData.get('review_id') as string
  const rating = parseInt(formData.get('rating') as string)
  const indicators: ReviewIndicator[] = JSON.parse(formData.get('indicators') as string)
  const reviewText = formData.get('reviewText') as string
  
  // Handle image uploads
  const imageKeys: string[] = []
  const imageFiles = formData.getAll('images') as File[]
  
  for (const file of imageFiles) {
    if (file.size > 0) {
      try {
        const key = await uploadReviewImage(file)
        imageKeys.push(key)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }
  
  await db
    .insert(reviewTable)
    .values({
      userId: user?.id || '',
      entityId: entity_id,
      id: review_id,
      rating: rating,
      comment: reviewText,
      images: imageKeys,
    })
    .then(() => {
      return db.insert(reviewIndicatorTable).values(indicators)
    })
  return Response.json({
    message: 'Review submitted successfully',
    data: {
      entity_id: entity_id,
      review_id: review_id,
      rating: rating,
      indicators: indicators,
      reviewText: reviewText,
      images: imageKeys,
    },
  })
}

export async function PUT(request: Request) {
  const res = await request.json()
  const reviewId = res.reviewId
  const comment = res.comment
  const data = await db
    .update(reviewTable)
    .set({ comment })
    .where(eq(reviewTable.id, reviewId))
  return Response.json({
    message: 'Review updated successfully',
    data,
  })
}
