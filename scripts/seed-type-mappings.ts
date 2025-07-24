import { db } from "@/lib/db";
import { typeTable, typeMappingTable } from "@/lib/db/schema";

async function seedTypeMappings() {
  console.log("Starting type mappings seed...");

  // First, ensure the base types exist
  const baseTypes = [
    "Restaurant",
    "Cinema",
    "Cafe",
    "Bar",
    "Store",
    "Government Office",
    "University",
    "School",
    "Healthcare",
    "Venue",
    "Other",
  ];

  // Insert base types (ignore if they already exist)
  for (const type of baseTypes) {
    try {
      await db.insert(typeTable).values({ type }).onConflictDoNothing();
    } catch (error) {
      console.log(`Type ${type} already exists or error occurred:`, error);
    }
  }

  // Define the type mappings with patterns and priorities
  const typeMappings = [
    // Restaurant patterns
    { type: "Restaurant", pattern: "restaurant", priority: 10 },

    // Cinema patterns
    { type: "Cinema", pattern: "movie", priority: 10 },
    { type: "Cinema", pattern: "cinema", priority: 10 },
    { type: "Cinema", pattern: "theater", priority: 8 },

    // Cafe patterns
    { type: "Cafe", pattern: "cafe", priority: 10 },
    { type: "Cafe", pattern: "coffee", priority: 8 },

    // Bar patterns
    { type: "Bar", pattern: "bar", priority: 10 },
    { type: "Bar", pattern: "pub", priority: 9 },
    { type: "Bar", pattern: "tavern", priority: 8 },

    // Store patterns
    { type: "Store", pattern: "store", priority: 10 },
    { type: "Store", pattern: "shop", priority: 9 },
    { type: "Store", pattern: "retail", priority: 8 },
    { type: "Store", pattern: "market", priority: 7 },

    // Government Office patterns
    { type: "Government Office", pattern: "government office", priority: 10 },
    { type: "Government Office", pattern: "city hall", priority: 9 },
    { type: "Government Office", pattern: "courthouse", priority: 9 },
    { type: "Government Office", pattern: "dmv", priority: 9 },

    // University patterns
    { type: "University", pattern: "university", priority: 10 },
    { type: "University", pattern: "college", priority: 9 },

    // School patterns
    { type: "School", pattern: "school", priority: 10 },
    { type: "School", pattern: "elementary", priority: 9 },
    { type: "School", pattern: "high school", priority: 9 },
    { type: "School", pattern: "middle school", priority: 9 },

    // Healthcare patterns
    { type: "Healthcare", pattern: "hospital", priority: 10 },
    { type: "Healthcare", pattern: "health", priority: 9 },
    { type: "Healthcare", pattern: "pharmacy", priority: 9 },
    { type: "Healthcare", pattern: "clinic", priority: 9 },
    { type: "Healthcare", pattern: "medical", priority: 8 },
    { type: "Healthcare", pattern: "doctor", priority: 8 },

    // Venue patterns
    { type: "Venue", pattern: "stadium", priority: 10 },
    { type: "Venue", pattern: "arena", priority: 10 },
    { type: "Venue", pattern: "venue", priority: 9 },
    { type: "Venue", pattern: "auditorium", priority: 8 },
    { type: "Venue", pattern: "concert hall", priority: 8 },
  ];

  // Insert type mappings
  for (const mapping of typeMappings) {
    try {
      await db.insert(typeMappingTable).values(mapping).onConflictDoNothing();
      console.log(`Added mapping: ${mapping.pattern} -> ${mapping.type}`);
    } catch (error) {
      console.log(`Error adding mapping ${mapping.pattern}:`, error);
    }
  }

  console.log("Type mappings seed completed!");
}

// Run the seed function
seedTypeMappings().catch(console.error);
