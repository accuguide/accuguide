import { db } from "@/db";
import { Type, typeTable } from "@/db/schema";

const main = async () => {
  try {
    await db.delete(typeTable);
    const types: Type[] = [
      {
        name: "Restaurant",
        indicators: ["Braille Menu", "ADA Compliant Restroom"],
      },
      {
        name: "Other",
        indicators: ["Wheelchair Accessible"],
      },
    ];
    await db.insert(typeTable).values(types);
    console.log("Database seeded, press Ctrl+C to exit");
  } catch (error) {
    console.error("Error seeding the database:", error);
    throw new Error("Error seeding database");
  }
};

main();
