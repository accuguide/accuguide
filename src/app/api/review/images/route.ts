import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { reviewImagesTable } from '@/lib/db/schema'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const reviewId = searchParams.get('reviewId') || ''

    const images = await db
      .select()
      .from(reviewImagesTable)
      .where(eq(reviewImagesTable.reviewId, reviewId))

    return NextResponse.json(images, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      error: `[api/review/images GET] error: ${error}`,
    })
  }
}
