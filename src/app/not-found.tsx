import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-balance bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text font-semibold text-5xl text-transparent tracking-tight sm:text-7xl dark:from-slate-100 dark:via-blue-200 dark:to-slate-100">
          Page not found
        </h1>
        <p className="mt-6 text-pretty font-medium text-lg text-slate-600 sm:text-xl/8 dark:text-slate-300">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-primary px-3.5 py-2.5 font-semibold text-primary-foreground text-sm shadow-xs transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            Go back home
          </Link>
          {/* <Link href="/info/contact" className="text-sm font-semibold text-foreground hover:opacity-75 transition-opacity">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link> */}
        </div>
      </div>
    </main>
  )
}
