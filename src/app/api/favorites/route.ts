import { and, desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { entityTable, favoriteTable } from '@/lib/db/schema'
import { getServerUser } from '@/lib/session'

export async function GET(request: Request) {
  const user = await getServerUser()
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const favorites = await db
    .select({
      id: favoriteTable.id,
      entityId: favoriteTable.entityId,
      createdAt: favoriteTable.createdAt,
      entity: entityTable,
    })
    .from(favoriteTable)
    .innerJoin(entityTable, eq(favoriteTable.entityId, entityTable.id))
    .where(eq(favoriteTable.userId, user.id))
    .orderBy(desc(favoriteTable.createdAt))

  return Response.json({ favorites })
}

export async function POST(request: Request) {
  const user = await getServerUser()
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { entityId } = await request.json()

  if (!entityId) {
    return Response.json({ error: 'Entity ID is required' }, { status: 400 })
  }

  // Check if already favorited
  const existing = await db
    .select()
    .from(favoriteTable)
    .where(
      and(
        eq(favoriteTable.userId, user.id),
        eq(favoriteTable.entityId, entityId),
      ),
    )
    .limit(1)

  if (existing.length > 0) {
    return Response.json({ error: 'Already favorited' }, { status: 409 })
  }

  const favorite = await db
    .insert(favoriteTable)
    .values({
      userId: user.id,
      entityId,
    })
    .returning()

  return Response.json({ favorite: favorite[0] })
}

export async function DELETE(request: Request) {
  const user = await getServerUser()
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const entityId = searchParams.get('entityId')

  if (!entityId) {
    return Response.json({ error: 'Entity ID is required' }, { status: 400 })
  }

  await db
    .delete(favoriteTable)
    .where(
      and(
        eq(favoriteTable.userId, user.id),
        eq(favoriteTable.entityId, entityId),
      ),
    )

  return Response.json({ success: true })
}
