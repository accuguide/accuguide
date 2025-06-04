import Search from "@/components/search";
import Link from "next/link";
import HeaderUser from "./header-user";
import { Button } from "./ui/button";
import { getCurrentSession } from "@/lib/session";
import { getUserFromGoogleId } from "@/lib/user";

export default async function Header() {
  const session = await getCurrentSession();
  const user = await getUserFromGoogleId(session.user?.googleId || "");
  return (
    <header className="border-b-2 px-4 md:px-8 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold">
        Accuguide
      </Link>
      <div className="flex gap-4">
        <Search size="half" />
        {user?.admin && (
          <Link href="/admin/">
            <Button>Admin</Button>
          </Link>
        )}
        <HeaderUser />
      </div>
    </header>
  );
}
