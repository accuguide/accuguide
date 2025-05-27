import { db } from "@/db";
import { typeTable, ZodTypeEnum } from "@/db/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  const indicators = await db
    .select()
    .from(typeTable)
    .where(
      eq(
        typeTable.name,
        ZodTypeEnum.Enum[type as keyof typeof ZodTypeEnum.Enum],
      ),
    )
    .orderBy(typeTable.indicator);

  return Response.json(indicators);
}
