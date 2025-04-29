import { db } from "@/db";
import { Type, typeTable } from "./schema";

const main = async () => {
  try {
    await db.delete(typeTable);
    const types: Type[] = [
      {
        type: "Restaurant",
        indicators: ["Braille Menu", "ADA Compliant Restroom"],
      },
      { type: "Bar", indicators: ["Braille Menu", "ADA Compliant Restroom"] },
    ];
    await db.insert(typeTable).values(types);
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

main();
