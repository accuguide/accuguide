import { db } from "@/lib/db";
import { typeMappingTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Add a new type mapping to the database
 * @param type - The target type (must exist in typeTable)
 * @param pattern - The pattern to match against
 * @param priority - Priority for matching (higher = checked first)
 */
export async function addTypeMapping(
  type: string,
  pattern: string,
  priority: number = 5,
) {
  try {
    await db.insert(typeMappingTable).values({
      type,
      pattern: pattern.toLowerCase(),
      priority,
    });
    console.log(
      `Added type mapping: "${pattern}" -> "${type}" (priority: ${priority})`,
    );
  } catch (error) {
    console.error("Error adding type mapping:", error);
    throw error;
  }
}

/**
 * Get all type mappings for a specific type
 * @param type - The type to get mappings for
 */
export async function getTypeMappings(type?: string) {
  const query = db.select().from(typeMappingTable);

  if (type) {
    return await query.where(eq(typeMappingTable.type, type));
  }

  return await query;
}

/**
 * Remove a type mapping
 * @param id - The ID of the mapping to remove
 */
export async function removeTypeMapping(id: string) {
  try {
    await db.delete(typeMappingTable).where(eq(typeMappingTable.id, id));
    console.log(`Removed type mapping with ID: ${id}`);
  } catch (error) {
    console.error("Error removing type mapping:", error);
    throw error;
  }
}

/**
 * Update a type mapping's priority
 * @param id - The ID of the mapping to update
 * @param newPriority - The new priority value
 */
export async function updateTypeMappingPriority(
  id: string,
  newPriority: number,
) {
  try {
    await db
      .update(typeMappingTable)
      .set({ priority: newPriority })
      .where(eq(typeMappingTable.id, id));
    console.log(`Updated type mapping priority for ID ${id} to ${newPriority}`);
  } catch (error) {
    console.error("Error updating type mapping priority:", error);
    throw error;
  }
}
