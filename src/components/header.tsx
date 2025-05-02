import Search from "@/components/search";
import Link from "next/link";
import HeaderUser from "./header-user";

export default async function Header() {
  return (
    <header className="border-b px-8 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold">
        Access Finder
      </Link>
      <div className="flex gap-4">
        <Search size="half" />
        <HeaderUser />
      </div>
    </header>
  );
}
