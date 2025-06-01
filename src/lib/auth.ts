import { Google } from "arctic";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID || "default-client-id",
  process.env.GOOGLE_CLIENT_SECRET || "default-client-secret",
  `${process.env.URL}/login/google/callback`,
);

export async function checkAuthRedirect() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect("/login");
  }
}

export async function checkAuthDisplay() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return false;
  }
  return true;
}
