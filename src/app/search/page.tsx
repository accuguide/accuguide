'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import MapComponent from '@/components/map'
import Location from '@/components/search/location'
import SearchDisplay from '@/components/search/search-display'
import SearchSkeleton from '@/components/skeletons/search-skeleton'
import { useLocation } from '@/contexts/location-context'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { PointOfInterest, SearchDisplayProps } from '@/lib/types'

/** Helpers to parse city/state from the address string.
 *  DB addresses look like: "addr1 addr2, City, State, Zip"
 *  Google addresses vary by country; this is best-effort only.
 */
function parseCityFromAddress(address?: string): string | null {
  if (!address) return null
  console.log(address)
  const parts = address.split(',').map((s) => s.trim())
  // Try common "..., City, State ..." shape
  if (parts.length >= 3) {
    // Use the element before the state as city
    return parts[parts.length - 3] || null
  }
  // Fallback: try middle segment if three parts
  if (parts.length === 2) {
    return parts[0] || null
  }
  return null
}

function parseStateFromAddress(address?: string): string | null {
  if (!address) return null
  const parts = address.split(',').map((s) => s.trim())
  // Try common "..., City, State, Zip/Country"
  if (parts.length >= 3) {
    return parts[parts.length - 2] || null
  }
  // If only two parts, sometimes the last is state/region
  if (parts.length === 2) {
    return parts[1] || null
  }
  return null
}

function uniqueSorted(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(values.filter((v): v is string => Boolean(v && v.trim()))),
  ).sort((a, b) => a.localeCompare(b))
}

function SearchResults() {
  const [results, setResults] = useState<SearchDisplayProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const query = searchParams.get('query') || ''
  const initialType = searchParams.get('type') || 'All'
  const initialCity = searchParams.get('city') || 'All'
  const initialState = searchParams.get('state') || 'All'

  const { latitude, longitude, isLocationChecked } = useLocation()
  const [locations, setLocations] = useState<PointOfInterest[]>([])

  // pagination
  const [currentPage, setCurrentPage] = useState(
    Math.max(parseInt(searchParams.get('page') || '1', 10), 1),
  )
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // filters (sync with URL on change)
  const [selectedType, setSelectedType] = useState<string>(initialType)
  const [selectedCity, setSelectedCity] = useState<string>(initialCity)
  const [selectedState, setSelectedState] = useState<string>(initialState)

  // Options derived from current results
  const typeOptions = useMemo(
    () =>
      uniqueSorted(results.map((r) => (r.type || '').toString().toLowerCase())),
    [results],
  )

  const inferredCities = useMemo(
    () =>
      uniqueSorted(
        results.map((r) => r.city || parseCityFromAddress(r.address)),
      ),
    [results],
  )

  const inferredStates = useMemo(
    () =>
      uniqueSorted(
        results.map((r) => r.state || parseStateFromAddress(r.address)),
      ),
    [results],
  )

  // Keep URL in sync when filters or page change (no scroll jump)
  const syncUrl = (next: {
    type?: string
    city?: string
    state?: string
    page?: number
  }) => {
    const params = new URLSearchParams(searchParams.toString())

    // Required: query
    if (query) params.set('query', query)

    // Optional filters
    const t = next.type ?? selectedType
    const c = next.city ?? selectedCity
    const s = next.state ?? selectedState
    const p = next.page ?? currentPage

    if (t && t !== 'All') params.set('type', t)
    else params.delete('type')

    if (c && c !== 'All') params.set('city', c)
    else params.delete('city')

    if (s && s !== 'All') params.set('state', s)
    else params.delete('state')

    if (p && p > 1) params.set('page', String(p))
    else params.delete('page')

    // Location params are implicit (from context), leave them out of URL to keep it clean
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // When the query changes, reset page and re-sync
  useEffect(() => {
    setCurrentPage(1)
    syncUrl({ page: 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // Fetch data whenever inputs change
  useEffect(() => {
    if (!query || !isLocationChecked) return

    setIsLoading(true)

    const params = new URLSearchParams({ query })

    if (latitude != null && longitude != null) {
      params.append('latitude', latitude.toString())
      params.append('longitude', longitude.toString())
    }

    // API paging (your API expects `page`)
    params.append('page', currentPage.toString())

    // Filters (only append when not "All")
    if (selectedType && selectedType !== 'All') {
      params.append('type', selectedType.toLowerCase())
    }
    if (selectedCity && selectedCity !== 'All') {
      params.append('city', selectedCity)
    }
    if (selectedState && selectedState !== 'All') {
      params.append('state', selectedState)
    }

    fetch(`/api/search/?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          console.error(`[search] error calling /api/search`)
        }
        return response.json()
      })
      .then((data) => {
        setResults(data.data || [])
        setTotalPages(data.totalPages || 1)
        setTotalResults(data.totalResults || 0)

        const tempLocations: PointOfInterest[] = (data.data || []).map(
          (place: {
            name: string
            address: string
            lat: number
            lng: number
          }) => ({
            key: place.address,
            name: place.name,
            address: place.address,
            location: { lat: place.lat, lng: place.lng },
          }),
        )
        setLocations(tempLocations)
      })
      .catch((error) => {
        console.error(`[search] error ${error}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    query,
    latitude,
    longitude,
    isLocationChecked,
    currentPage,
    selectedType,
    selectedCity,
    selectedState,
  ])

  // Initialize selections from URL if user navigates with history (optional)
  useEffect(() => {
    setSelectedType(initialType || 'All')
    setSelectedCity(initialCity || 'All')
    setSelectedState(initialState || 'All')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialType, initialCity, initialState])

  // Handlers
  const onSelectType = (val: string) => {
    setSelectedType(val)
    setCurrentPage(1)
    syncUrl({ type: val, page: 1 })
  }
  const onSelectCity = (val: string) => {
    setSelectedCity(val)
    setCurrentPage(1)
    syncUrl({ city: val, page: 1 })
  }
  const onSelectState = (val: string) => {
    setSelectedState(val)
    setCurrentPage(1)
    syncUrl({ state: val, page: 1 })
  }
  const clearFilters = () => {
    setSelectedType('All')
    setSelectedCity('All')
    setSelectedState('All')
    setCurrentPage(1)
    syncUrl({ type: 'All', city: 'All', state: 'All', page: 1 })
  }

  return (
    <div>
      <Location />

      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <div>
          {/* Compact map for small screens, shown above results */}
          <div className="mt-6 lg:hidden">
            <MapComponent locations={locations} compact />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <h2 className="mt-8 mb-2">Results</h2>
              <p className="mb-4 text-muted-foreground text-sm">
                Results: {totalResults}
              </p>

              {/* === Filters Row (Type, City, State) === */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {/* Type Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[180px] justify-between"
                    >
                      Type: {selectedType}
                      <ChevronDown className="ml-2 size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => onSelectType('All')}>
                      All
                    </DropdownMenuItem>
                    {typeOptions.map((t) => (
                      <DropdownMenuItem key={t} onClick={() => onSelectType(t)}>
                        {t}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* City Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[180px] justify-between"
                    >
                      City: {selectedCity}
                      <ChevronDown className="ml-2 size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => onSelectCity('All')}>
                      All
                    </DropdownMenuItem>
                    {inferredCities.map((city) => (
                      <DropdownMenuItem
                        key={city}
                        onClick={() => onSelectCity(city)}
                      >
                        {city}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* State Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[180px] justify-between"
                    >
                      State: {selectedState}
                      <ChevronDown className="ml-2 size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => onSelectState('All')}>
                      All
                    </DropdownMenuItem>
                    {inferredStates.map((st) => (
                      <DropdownMenuItem
                        key={st}
                        onClick={() => onSelectState(st)}
                      >
                        {st}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Clear */}
                <Button
                  variant="ghost"
                  className="ml-auto"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="mt-4 mb-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      const next = Math.max(currentPage - 1, 1)
                      setCurrentPage(next)
                      syncUrl({ page: next })
                    }}
                    disabled={currentPage === 1}
                    className="cursor-pointer rounded border px-3 py-1 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page)
                          syncUrl({ page })
                        }}
                        className={`cursor-pointer rounded border px-3 py-1 ${
                          page === currentPage ? 'bg-black text-white' : ''
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => {
                      const next = Math.min(currentPage + 1, totalPages)
                      setCurrentPage(next)
                      syncUrl({ page: next })
                    }}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer rounded border px-3 py-1 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Results grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((place) => (
                  <SearchDisplay key={place.id ?? place.googleId} {...place} />
                ))}
              </div>
            </div>

            {/* Sidebar map for large screens */}
            <div className="sticky top-4 hidden h-fit lg:block">
              <MapComponent locations={locations} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  )
}
