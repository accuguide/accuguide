import Image from 'next/image'
import Link from 'next/link'
import Search from '@/components/search/search'
import HeaderUser from './header-user'

export default async function Header() {
  return (
    <div className="mx-4 md:mx-12">
      <div className="mx-auto max-w-7xl">
        <header className="sticky top-0 z-50 w-full bg-slate-100 dark:bg-slate-900">
          <div className="mx-auto flex max-w-7xl items-center justify-between py-4 text-center">
            <Link
              href="/"
              className="hidden font-bold text-lg text-slate-700 sm:block dark:text-slate-200"
            >
              Accuguide
            </Link>
            <div className="shrink-0 hover:opacity-50 sm:hidden">
              <Link href="/" className="font-bold">
                <Image
                  src="/images/logo.png"
                  alt="Accuguide Logo"
                  width={38}
                  height={38}
                  className="rounded-lg"
                />
              </Link>
            </div>
            <div className="flex gap-4">
              <Search size="half" />
              <HeaderUser />
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}
