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
            className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />
          <Input
            id="search-half"
            placeholder="Search places..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 py-2 pr-2 pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            aria-label="Search for accessible places"
            disabled={isPending}
          />
          {isPending && (
            <Loader2 className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 animate-spin text-slate-400" />
          )}
        </div>
      </form>
    )
  }

  // Full and page size styling
  return (
    <div className="mt-8 flex w-full justify-center md:mt-12">
      <form onSubmit={handleSubmit} className="flex w-full gap-2 md:max-w-3xl">
        {/* Search input */}
        <label htmlFor="search-full" className="sr-only">
          Search places
        </label>
        <Input
          id="search-full"
          placeholder="Search for restaurants, shops, parks, services, and more..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-0 py-5 text-lg md:py-6"
          aria-label="Search for accessible places and services"
          disabled={isPending}
        />

        {/* Search button */}
        <Button
          type="submit"
          disabled={!query.trim() || isPending}
          className="py-5 transition-all duration-200 disabled:opacity-50 md:px-8 md:py-6"
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
      </form>
    </div>
  )
}
