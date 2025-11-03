'use client'

import { Loader2, SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { type FormEvent, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export type SearchProps = {
  size: 'half' | 'full' | 'page'
}

export default function Search({ size }: SearchProps) {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!query.trim()) return

    const encodedQuery = encodeURIComponent(query.trim())

    startTransition(() => {
      router.push(`/search?query=${encodedQuery}`)
    })
  }

  // Special case for homepage half size
  if (pathname === '/' && size === 'half') {
    return (
      <div className="w-[50vw]">
        <span></span>
      </div>
    )
  }

  // Header/Half size styling
  if (size === 'half') {
    return (
      <form onSubmit={handleSubmit} className="relative max-w-full md:max-w-md">
        <label htmlFor="search-half" className="sr-only">
          Search places
        </label>
        <div className="relative">
          <SearchIcon
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />
          <Input
            id="search-half"
            placeholder="Search places..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 py-2 pl-10 pr-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            aria-label="Search for accessible places"
            disabled={isPending}
          />
          {isPending && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400" />
          )}
        </div>
      </form>
    )
  }

  // Full and page size styling
  return (
    <div className="flex w-full justify-center">
      <form onSubmit={handleSubmit} className="relative w-full md:max-w-3xl">
        <div className="group relative">
          {/* Animated background gradient */}

          {/* Main search container */}
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-3xl dark:border-slate-700 dark:bg-slate-800/95">
            <div className="flex items-center p-1 md:p-2">
              {/* Search icon */}
              <div className="hidden md:flex items-center justify-center px-4">
                <SearchIcon
                  className="h-6 w-6 text-slate-400 transition-colors group-focus-within:text-blue-500 dark:text-slate-500"
                  aria-hidden="true"
                />
              </div>

              {/* Search input */}
              <label htmlFor="search-full" className="sr-only">
                Search places
              </label>
              <Input
                id="search-full"
                placeholder="Search for places, services, or accessibility features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent py-4 text-lg placeholder:text-slate-500 focus:ring-0 focus-visible:ring-0 dark:text-slate-100 dark:placeholder:text-slate-400"
                aria-label="Search for accessible places and services"
                disabled={isPending}
              />

              {/* Search button */}
              <Button
                type="submit"
                disabled={!query.trim() || isPending}
                className="mr-1 bg-linear-to-r from-blue-500 to-purple-600 px-4 md:px-8 py-3 text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg disabled:opacity-50 ml-3"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </div>
          </div>

          {/* Search suggestions or popular searches */}
          <div className="hidden md:flex mt-4 flex-wrap justify-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400 mt-1">
              Popular searches:
            </span>
            {['Restaurants', 'Hotels', 'Museums', 'Parks', 'Shopping'].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    const encodedQuery = encodeURIComponent(term)
                    startTransition(() => {
                      router.push(`/search?query=${encodedQuery}`)
                    })
                  }}
                  className="rounded-lg bg-slate-100 px-3 py-1 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                >
                  {term}
                </button>
              ),
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
