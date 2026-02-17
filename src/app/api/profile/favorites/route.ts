import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { entityUserTable } from '@/lib/db/schema'
import { getServerUser } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()

    if (!user) {
      return NextResponse.json(
        {
          error: '[api/profile/favorites POST] Unauthorized',
        },
        { status: 401 },
      )
    }

    const searchParams = request.nextUrl.searchParams
    const entityId = searchParams.get('entityId') || ''
    const favorited = searchParams.get('favorited') === 'true'
    if (!favorited) {
      await db.insert(entityUserTable).values({
        userId: user.id,
        entityId,
      })
    } else {
      await db
        .delete(entityUserTable)
        .where(
          and(
            eq(entityUserTable.userId, user.id),
            eq(entityUserTable.entityId, entityId),
          ),
        )
    }

    return NextResponse.json({
      message: `[api/profile/favorites POST] success`,
    })
  } catch (error) {
    return NextResponse.json({
      error: `[api/profile/favorites POST] error: ${error}`,
    })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()

    if (!user) {
      return NextResponse.json(
        {
          error: '[api/profile/favorites POST] Unauthorized',
        },
        { status: 401 },
      )
    }

    const searchParams = request.nextUrl.searchParams
    const entityId = searchParams.get('entityId') || ''
    const item = await db
      .select()
      .from(entityUserTable)
      .where(
        and(
          eq(entityUserTable.userId, user.id),
          eq(entityUserTable.entityId, entityId),
        ),
      )

    return NextResponse.json({
      favorited: item.length > 0,
    })
  } catch (error) {
    return NextResponse.json({
      error: `[api/profile/favorites GET] error: ${error}`,
    })
  }
}
