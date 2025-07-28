import { db } from '@/lib/db'
import { user } from '@/lib/db/auth-schema'
import { inArray } from 'drizzle-orm'

export async function getUserInfosByIds(
  userIds: string[],
): Promise<Record<string, { name: string; image?: string | null }>> {
  if (userIds.length === 0) return {}
  const users = await db.select().from(user).where(inArray(user.id, userIds))
  const map: Record<string, { name: string; image?: string | null }> = {}
  for (const u of users) {
    map[u.id] = { name: u.name, image: u.image }
  }
  return map
}

// Backwards compatible alias for just names
export async function getUsernamesByIds(
  userIds: string[],
): Promise<Record<string, string>> {
  const infos = await getUserInfosByIds(userIds)
  const map: Record<string, string> = {}
  for (const id of Object.keys(infos)) {
    map[id] = infos[id].name
  }
  return map
}
