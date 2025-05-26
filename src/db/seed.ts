import { db } from "@/db";
import { typeTable, ZodTypeEnum, ZodIndicatorEnum } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

async function main() {
  try {
    await db.delete(typeTable);
    const typeTableSeed = [
      {
        id: uuidv4(),
        name: ZodTypeEnum.Enum["Restaurant"],
        indicator: ZodIndicatorEnum.Enum["Braille Menu"],
      },
    ];
    await db.insert(typeTable).values(typeTableSeed);
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

main()
  .then(() => {
    console.log("Seeding completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
  });
