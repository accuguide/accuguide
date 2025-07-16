import { getServerUser } from "@/lib/session";

export async function GET() {
  const user = await getServerUser();
  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
