import Image from 'next/image'
import Link from 'next/link'
import Search from '@/components/search/search'
import HeaderUser from './header-user'

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center border-b-2 bg-slate-100 px-4 py-4 text-center sm:justify-between md:px-12 dark:bg-slate-900">
      <Link href="/" className="hidden font-bold sm:block text-lg">
        Accuguide
      </Link>
      <div className="flex gap-4">
        <div className="hover:opacity-50 shrink-0">
          <Link href="/" className="font-bold md:hidden">
            <Image
              src="/images/logo.png"
              alt="Accuguide Logo"
              width={38}
              height={38}
              className="rounded-lg sm:hidden"
            />
          </Link>
        </div>

        <Search size="half" />
        <HeaderUser />
      </div>
    </header>
  )
}
