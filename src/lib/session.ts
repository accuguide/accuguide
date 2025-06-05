import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}

export async function checkAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ? true : false;
}
