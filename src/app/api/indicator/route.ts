import { db } from "@/db";
import { typeIndicatorTable } from "@/db/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  if (!type) {
    return Response.json({ error: "Missing type parameter" }, { status: 400 });
  }

  const indicators = await db
    .select()
    .from(typeIndicatorTable)
    .where(eq(typeIndicatorTable.type, type))
    .orderBy(typeIndicatorTable.indicator);

  return Response.json(indicators);
}
