import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  ReviewIndicator,
  reviewImagesTable,
  reviewIndicatorTable,
  reviewTable,
} from '@/lib/db/schema'
import { uploadReviewImages } from '@/lib/s3/functions'
import { getServerUser } from '@/lib/session'

export async function POST(request: Request) {
  const user = await getServerUser()
  const formData = await request.formData()

  const indicators_raw = formData.getAll('indicators')
  const images = formData.getAll('images') as File[]
  const userId = user?.id || ''
  const entityId = formData.get('entity_id') as string
  const reviewId = formData.get('review_id') as string
  const rating = parseInt(formData.get('rating') as string, 10)
  const reviewText = formData.get('reviewText') as string

  let indicators: ReviewIndicator[]

  try {
    indicators = JSON.parse(indicators_raw[0] as string) as ReviewIndicator[]
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid indicators format' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  await db
    .insert(reviewTable)
    .values({
      userId,
      entityId,
      id: reviewId,
      rating,
      comment: reviewText,
    })
    .then(() => {
      return db.insert(reviewIndicatorTable).values(indicators)
    })
    .then(() => {
      return uploadReviewImages(images)
    })
    .then((keys) => {
      const keyList = keys.map((key) => ({ reviewId, image: key }))
      return db.insert(reviewImagesTable).values(keyList)
    })
    .catch((error) => {
      console.error('Error submitting review:', error)
      throw error
    })

  return new Response(
    JSON.stringify({
      message: 'Review submitted successfully',
      data: {
        entity_id: entityId,
        review_id: reviewId,
        rating,
        indicators,
        reviewText,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
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
