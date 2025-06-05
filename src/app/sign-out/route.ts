import { redirect } from "next/navigation";
import { signOutServer } from "@/lib/sign-out";

export async function GET() {
  await signOutServer().then(() => redirect("/"));
}
