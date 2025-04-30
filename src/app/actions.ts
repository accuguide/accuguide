import {
  getCurrentSession,
  invalidateSession,
  deleteSessionTokenCookie,
} from "@/lib/session";
import { ActionResult } from "next/dist/server/app-render/types";
import { redirect } from "next/navigation";

export async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await getCurrentSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
  return redirect("/");
}
