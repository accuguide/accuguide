import { db } from "@/lib/db";
import { indicatorTable, typeIndicatorTable } from "@/lib/db/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  if (!type) {
    return Response.json({ error: "Missing type parameter" }, { status: 400 });
  }

  let return_indicators;

  if (type === "Other") {
    return_indicators = await db.select().from(indicatorTable);
    console.log("Fetching all indicators for type 'Other'");
  } else {
    return_indicators = await db
      .select()
      .from(typeIndicatorTable)
      .where(eq(typeIndicatorTable.type, type))
      .orderBy(typeIndicatorTable.indicator);
  }
  console.log(return_indicators);
  return Response.json(return_indicators);
}
