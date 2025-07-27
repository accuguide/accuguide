import { db } from "@/lib/db";
import { indicatorTable, typeIndicatorTable, typeTable } from "@/lib/db/schema";
import { NextRequest } from "next/server";
import { eq, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  if (!type) {
    return Response.json({ error: "Missing type parameter" }, { status: 400 });
  }

  const dbType = db.select().from(typeTable).where(eq(typeTable.type, type));
  const bathroom_indicators = await db
    .select()
    .from(indicatorTable)
    .where(eq(indicatorTable.category, "Bathroom"));
  let return_indicators;

  if (type === "Other") {
    return_indicators = await db.select().from(indicatorTable);
  } else {
    const specific_indicator_results = await db
      .select()
      .from(typeIndicatorTable)
      .where(eq(typeIndicatorTable.type, type))
      .orderBy(typeIndicatorTable.indicator);
    const specific_indicators = specific_indicator_results.map(
      (result) => result.indicator,
    );
    const specific_indicator_info = await db
      .select()
      .from(indicatorTable)
      .where(inArray(indicatorTable.indicator, specific_indicators));

    // Combine bathroom indicators with specific indicators
    return_indicators = [...bathroom_indicators, ...specific_indicator_info];
  }
  return Response.json(return_indicators);
}
