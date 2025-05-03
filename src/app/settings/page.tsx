import Settings from "@/components/settings";
import { getCurrentSession } from "@/lib/session";
import { getUserFromGoogleId } from "@/lib/user";

export default async function Page() {
  const session = await getCurrentSession();
  const user = await getUserFromGoogleId(session.user?.googleId || "");
  return (
    <div>
      <Settings user={user} />
    </div>
  );
}
