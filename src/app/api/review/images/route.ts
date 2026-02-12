import { db } from '@/lib/db'
import { reviewImagesTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export default function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reviewId = searchParams.get('reviewId') || ''

  return db
    .select()
    .from(reviewImagesTable)
    .where(eq(reviewImagesTable.reviewId, reviewId))
}
