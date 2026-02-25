'use client'

import { Loader2, Search as SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { type FormEvent, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocation } from '@/contexts/location-context'

export type SearchProps = {
  size: 'half' | 'full' | 'page'
}

export default function Search({ size }: SearchProps) {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [locationActive, setLocationActive] = useState(false) // local toggle state
  const { latitude, longitude, status, requestLocation } = useLocation()
  const pathname = usePathname()
  const router = useRouter()

  const isLocating = status === 'requesting'
  const hasLocation = latitude !== null && longitude !== null

  // Restore user's previous preference (if they left it ON)
  useEffect(() => {
    const saved = localStorage.getItem('location-active')
    if (saved === 'true' && status === 'granted') {
      setLocationActive(true)
    }
  }, [status])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    let url = `/search?query=${encodeURIComponent(query.trim())}`

    // Only include coords if user actively wants location
    if (locationActive && hasLocation) {
      url += `&lat=${latitude.toFixed(6)}&lng=${longitude.toFixed(6)}`
    }

    startTransition(() => router.push(url))
  }

  const handleToggleChange = (checked: boolean) => {
    console.log('[SEARCH] Toggle changed to:', checked)

    setLocationActive(checked)

    if (checked) {
      if (status !== 'granted') {
        console.log('[SEARCH] Requesting permission')
        requestLocation()
      } else {
        console.log('[SEARCH] Using existing location')
        toast.info('Using your location')
      }
    } else {
      console.log('[SEARCH] Location use disabled')
      toast.info('Location turned off')
    }
  }

  // Save toggle preference
  useEffect(() => {
    localStorage.setItem('location-active', locationActive.toString())
  }, [locationActive])

  // Homepage placeholder
  if (pathname === '/' && size === 'half') {
    return (
      <div className="w-[50vw]">
        <span></span>
      </div>
    )
  }

  // Compact version (header / half)
  if (size === 'half') {
    return (
      <div className="relative ml-4 max-w-full md:ml-0 md:min-w-sm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search-half" className="sr-only">
            Search places
          </label>
          <div className="relative">
            <SearchIcon
              className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <Input
              id="search-half"
              placeholder="Search for places..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 py-2 pr-2 pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              disabled={isPending || isLocating}
            />
            {isPending && (
              <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400" />
            )}
          </div>
        </form>

        <div className="mt-3 flex items-center justify-center gap-2">
          <input
            type="checkbox"
            id="use-location"
            checked={locationActive}
            onChange={(e) => handleToggleChange(e.target.checked)}
            disabled={isPending || isLocating}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label
            htmlFor="use-location"
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            Use my location
            {isLocating && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            )}
            {locationActive && hasLocation && (
              <span className="text-green-600 text-xs">(active)</span>
            )}
          </Label>
        </div>
      </div>
    )
  }

  // Full / page version
  return (
    <div className="mt-8 flex w-full justify-center md:mt-12">
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Search for restaurants, shops, parks, services, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 py-5 text-lg focus-visible:ring-2 focus-visible:ring-blue-500 md:py-6"
            disabled={isPending || isLocating}
          />
          <Button
            type="submit"
            disabled={!query.trim() || isPending || isLocating}
            className="px-8 py-5"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2">
          <input
            type="checkbox"
            id="use-location-full"
            checked={locationActive}
            onChange={(e) => handleToggleChange(e.target.checked)}
            disabled={isPending || isLocating}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label
            htmlFor="use-location-full"
            className="flex cursor-pointer items-center gap-2 font-medium text-sm"
          >
            Search near my current location
            {isLocating && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            )}
            {locationActive && hasLocation && (
              <span className="ml-1 text-green-600 text-xs">
                (using your position)
              </span>
            )}
          </Label>
        </div>
      </div>
    </div>
  )
}
