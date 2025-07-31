import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const entity = await db
      .select()
      .from(entityTable)
      .where(eq(entityTable.id, id))
      .limit(1)

    if (!entity || entity.length === 0) {
      return Response.json({ error: 'Entity not found' }, { status: 404 })
    }

    return Response.json({
      success: true,
      data: entity[0],
    })
  } catch (error) {
    console.error('Error fetching entity:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
