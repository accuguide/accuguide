import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'

export async function GET(
  _request: Request,
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
      return NextResponse.json(
        { error: `[api/entity/[id] GET] error: ${entity} not found` },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: entity[0],
    })
  } catch (error) {
    return NextResponse.json(
      { error: `[api/entity/[id] GET] error: ${error}` },
      { status: 500 },
    )
  }
}
