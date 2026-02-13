import { eq, inArray } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { indicatorTable, typeIndicatorTable, typeTable } from '@/lib/db/schema'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    if (!type) {
      return Response.json(
        { error: '[api/indicator GET] error: Missing type parameter' },
        { status: 400 },
      )
    }

    let return_indicators
    let bathroom_indicators: {
      indicator: string
      description: string
      category: string
    }[] = []

    const dbType = await db
      .select()
      .from(typeTable)
      .where(eq(typeTable.type, type))
    if (dbType[0].physical) {
      bathroom_indicators = await db
        .select()
        .from(indicatorTable)
        .where(eq(indicatorTable.category, 'Bathroom'))
    }

    if (type === 'Other') {
      return_indicators = await db.select().from(indicatorTable)
    } else {
      const specific_indicator_results = await db
        .select()
        .from(typeIndicatorTable)
        .where(eq(typeIndicatorTable.type, type))
        .orderBy(typeIndicatorTable.indicator)
      const specific_indicators = specific_indicator_results.map(
        (result) => result.indicator,
      )
      const specific_indicator_info = await db
        .select()
        .from(indicatorTable)
        .where(inArray(indicatorTable.indicator, specific_indicators))

      // Combine bathroom indicators with specific indicators
      return_indicators = [...bathroom_indicators, ...specific_indicator_info]
    }
    return Response.json(return_indicators)
  } catch (error) {
    return NextResponse.json({ error: `[api/indicator GET] error: ${error}` })
  }
}
