import Search from "@/components/search/search";
import Link from "next/link";
import HeaderUser from "./header-user";
import Image from "next/image";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-100 dark:bg-slate-900 border-b-2 px-4 md:px-8 py-4 flex items-center text-center justify-center sm:justify-between">
      <Link href="/" className="font-bold hidden sm:block">
        Accuguide
      </Link>
      <div className="flex gap-6 md:gap-4 ">
        <div className="hover:opacity-50">
          {" "}
          <Link href="/" className="font-bold md:hidden">
            <Image
              src="/images/logo.png"
              alt="Accuguide Logo"
              width={32}
              height={32}
              className="block sm:hidden rounded-lg mt-[2px]"
            />
          </Link>
        </div>

        <Search size="half" />
        <HeaderUser />
      </div>
    </header>
  );
}
