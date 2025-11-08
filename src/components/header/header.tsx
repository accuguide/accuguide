import Image from 'next/image'
import Link from 'next/link'
import Search from '@/components/search/search'
import HeaderUser from './header-user'

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-100 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-center py-4 text-center sm:justify-between">
        <Link
          href="/"
          className="hidden font-bold text-lg text-slate-600 sm:block dark:text-slate-300"
        >
          Accuguide
        </Link>
        <div className="flex gap-4">
          <div className="shrink-0 hover:opacity-50">
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
