import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(
  googleId: string,
  email: string,
  name: string,
  picture: string,
  admin: boolean,
) {
  const [user] = await db
    .insert(userTable)
    .values({ googleId, email, name, picture, admin })
    .returning()
    .execute();

  return user;
}

export async function getAdminStatus(googleId: string) {
  const [user] = await db
    .select({ admin: userTable.admin })
    .from(userTable)
    .where(eq(userTable.googleId, googleId))
    .execute();
  return user ? user.admin : false;
}

export async function getUserFromGoogleId(googleId: string) {
  // Query the database to find a user with the matching Google ID
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.googleId, googleId))
    .execute();
  return user || null;
}

export async function updateUserName(googleId: string, newName: string) {
  await db
    .update(userTable)
    .set({ name: newName })
    .where(eq(userTable.googleId, googleId))
    .execute();
}

export async function updatePictureUrl(googleId: string, newUrl: string) {
  await db
    .update(userTable)
    .set({ picture: newUrl })
    .where(eq(userTable.googleId, googleId))
    .execute();
}
