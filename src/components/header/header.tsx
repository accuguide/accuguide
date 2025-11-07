import Image from 'next/image'
import Link from 'next/link'
import Search from '@/components/search/search'
import HeaderUser from './header-user'

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-100 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl py-4 flex items-center justify-center text-center sm:justify-between">
        <Link
          href="/"
          className="hidden font-bold sm:block text-lg text-slate-600 dark:text-slate-300"
        >
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
      </div>
      <hr className="-mx-4 md:-mx-12 border" />
    </header>
  )
}
