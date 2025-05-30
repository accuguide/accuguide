import { db } from "@/db";
import { typeTable, ZodTypeEnum, ZodIndicatorEnum } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function main() {
  try {
    await db.delete(typeTable);
    const typeTableSeed = [
      {
        id: uuidv4(),
        name: ZodTypeEnum.Enum["Restaurant"],
        indicator: ZodIndicatorEnum.Enum["Braille Menu"],
      },
      {
        id: uuidv4(),
        name: ZodTypeEnum.Enum["Restaurant"],
        indicator: ZodIndicatorEnum.Enum["Wheelchair Accessible"],
      },
      {
        id: uuidv4(),
        name: ZodTypeEnum.Enum["Restaurant"],
        indicator: ZodIndicatorEnum.Enum["ADA Compliant Restroom"],
      },
      {
        id: uuidv4(),
        name: ZodTypeEnum.Enum["Restaurant"],
        indicator: ZodIndicatorEnum.Enum["Accessible Seating"],
      },
    ];
    await db.insert(typeTable).values(typeTableSeed);
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}
