'use client'

import { SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export type SearchProps = {
  size: 'half' | 'full' | 'page'
}

export default function Search({ size }: SearchProps) {
  const [query, setQuery] = useState('')
  const pathname = usePathname()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const encodedQuery = encodeURIComponent(query)
    window.location.href = `/search?query=${encodedQuery}`
  }

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
        <label htmlFor="search" className="sr-only">
          Search places
        </label>
        <Input
          id="search"
          placeholder="Search places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 py-2 pr-2"
          aria-label="Search for accessible places"
        />
      </form>
    )
  }

  // Full and page size styling (existing)
  return (
    <div className="flex w-full justify-center">
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
        <div className="group relative mb-4">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-25 blur transition duration-300 group-hover:opacity-40"></div>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xl dark:border-slate-400 dark:bg-black">
            <div className="flex items-center">
              <div className="hidden py-4 pr-1 pl-6 sm:block">
                <SearchIcon
                  className="h-5 w-5 text-slate-400 dark:text-slate-500"
                  aria-hidden="true"
                />
              </div>
              <label htmlFor="search" className="sr-only">
                Search places
              </label>

              <Input
                id="search"
                placeholder="Search for places or services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="m-2 flex-1 border-0 bg-transparent py-4 text-lg placeholder:text-slate-600 dark:text-slate-100 dark:placeholder:text-slate-400"
                aria-label="Search for accessible places"
              />
              <Button type="submit" variant="secondary" className="my-2 mr-2">
                Search
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
