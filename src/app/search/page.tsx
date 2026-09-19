'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import MapComponent from '@/components/map'
import Location from '@/components/search/location'
import SearchDisplay from '@/components/search/search-display'
import SearchSkeleton from '@/components/skeletons/search-skeleton'
import { useLocation } from '@/contexts/location-context'
import type { PointOfInterest, SearchDisplayProps } from '@/lib/types'

function SearchResults() {
  // Every Google results page we've fetched so far, kept in order.
  // e.g. googlePages[0] = page 1's results, googlePages[1] = page 2's, etc.
  // We keep old pages instead of discarding them so "Previous" is instant —
  // no need to ask Google again for a page we've already seen.
  const [googlePages, setGooglePages] = useState<SearchDisplayProps[][]>([])
  // Which cached page we're currently showing (0 = first page)
  const [googlePageIndex, setGooglePageIndex] = useState(0)
  // The token to fetch the page AFTER the last one we've cached.
  // null means Google has told us there's nothing more.
  const [googleNextToken, setGoogleNextToken] = useState<string | null>(null)
  const [isLoadingGooglePage, setIsLoadingGooglePage] = useState(false)
  const [dbResponse, setDbResponse] = useState<SearchDisplayProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  // Which DB page we're currently showing (starts at 1)
  const [dbPage, setDbPage] = useState(1)
  // Total DB pages returned by the API
  const [dbTotalPages, setDbTotalPages] = useState(1)

  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const { latitude, longitude, isLocationChecked } = useLocation()
  const [locations, setLocations] = useState<PointOfInterest[]>([])

  useEffect(() => {
    if (!query || !isLocationChecked) {
      return
    }

    setIsLoading(true)

    const params = new URLSearchParams({ query, page: '1' })
    if (latitude !== null && longitude !== null) {
      params.append('latitude', latitude.toString())
      params.append('longitude', longitude.toString())
    }

    fetch(`/api/search?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          console.error(`[search] error calling /api/search`)
        }
        return response.json()
      })
      .then((data) => {
        // Fresh search — start over with just this one page cached
        setGooglePages([data[1].data])
        setGooglePageIndex(0)
        setGoogleNextToken(data[1].nextPageToken ?? null)

        setDbResponse(data[0].data)
        // Fresh search — reset paging trackers for BOTH lists back to "page 1"
        setDbPage(1)
        setDbTotalPages(data[0].totalPages)

        const tempLocations: PointOfInterest[] = [
          ...data[0].data.map(
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
          ),
          ...data[1].data.map(
            (place: {
              name: string
              address: string
              lat: number
              lng: number
            }) => ({
              key: place.name,
              name: place.name,
              address: place.address,
              location: { lat: place.lat, lng: place.lng },
            }),
          ),
        ]
        setLocations(tempLocations)
      })
      .catch((error) => {
        console.error(`[search] error ${error}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [query, latitude, longitude, isLocationChecked])

  function goToDbPage(newPage: number) {
    if (!query) return

    setDbPage(newPage)

    const params = new URLSearchParams({
      query,
      page: newPage.toString(),
      dbOnly: 'true',
    })
    if (latitude !== null && longitude !== null) {
      params.append('latitude', latitude.toString())
      params.append('longitude', longitude.toString())
    }

    fetch(`/api/search?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        // We ONLY touch the database part here.
        // (This request also re-fetches Google's first page in the background,
        // as a side effect of the two being one shared API route — we simply
        // ignore that part so we don't disturb the Google list on screen.)
        setDbResponse(data[0].data)
        setDbTotalPages(data[0].totalPages)
      })
      .catch((error) =>
        console.error(`[search] error changing DB page: ${error}`),
      )
  }

  function goToGooglePage(newIndex: number) {
    if (newIndex < 0) return

    // We already have this page cached — just switch to it. Instant,
    // no network request needed. This is what makes "Previous" free.
    if (newIndex < googlePages.length) {
      setGooglePageIndex(newIndex)
      return
    }

    // Otherwise, this is a page we've never fetched — we need Google's help,
    // using the token it gave us after the last page we cached.
    if (!query || !googleNextToken) return

    setIsLoadingGooglePage(true)

    const params = new URLSearchParams({
      query,
      googlePageToken: googleNextToken,
    })

    fetch(`/api/search?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        // Add this new page onto the end of our cache, then jump to it.
        setGooglePages((prev) => [...prev, data[1].data])
        setGoogleNextToken(data[1].nextPageToken ?? null)
        setGooglePageIndex(newIndex)
      })
      .catch((error) =>
        console.error(`[search] error changing Google page: ${error}`),
      )
      .finally(() => setIsLoadingGooglePage(false))
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
              <h2 className="mt-8 mb-4">Catalogued Results</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dbResponse.map((place) => (
                  <SearchDisplay
                    displayType="db"
                    key={place.googleId + place.address}
                    id={place.id}
                    googleId={place.googleId}
                    name={place.name}
                    type={place.type}
                    address={place.address}
                    aiScore={place.aiScore || 0}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {/* Current page */}
                <span className="mr-3 font-medium text-sm text-white">
                  Page {dbPage} of {dbTotalPages}
                </span>

                {/* First page */}
                <button
                  onClick={() => goToDbPage(1)}
                  disabled={dbPage === 1}
                  aria-label="First page"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-lg text-white transition-all duration-200 hover:cursor-pointer hover:border-white/20 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  «
                </button>

                {/* Previous page */}
                <button
                  onClick={() => goToDbPage(dbPage - 1)}
                  disabled={dbPage === 1}
                  aria-label="Previous page"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-lg text-white transition-all duration-200 hover:cursor-pointer hover:border-white/20 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ‹
                </button>

                {/* Next page */}
                <button
                  onClick={() => goToDbPage(dbPage + 1)}
                  disabled={dbPage >= dbTotalPages}
                  aria-label="Next page"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-lg text-white transition-all duration-200 hover:cursor-pointer hover:border-white/20 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ›
                </button>

                {/* Last page */}
                <button
                  onClick={() => goToDbPage(dbTotalPages)}
                  disabled={dbPage >= dbTotalPages}
                  aria-label="Last page"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-lg text-white transition-all duration-200 hover:cursor-pointer hover:border-white/20 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  »
                </button>
              </div>

              <h2 className="mt-8 mb-4">All Results</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(googlePages[googlePageIndex] ?? []).map((place) => (
                  <SearchDisplay
                    displayType="google"
                    key={place.googleId + place.address}
                    googleId={place.googleId}
                    name={place.name}
                    type={place.type}
                    address={place.address}
                    aiScore={0}
                  />
                ))}
              </div>

              {/* Pagination controls — no total page count shown here, since Google
    never tells us how many pages exist in total, unlike our DB results. */}
              {/* Only show pagination if there's actually more than one page worth of
    results — either we've already got 2+ pages cached, or Google still
    has more beyond what we're showing. Otherwise (e.g. zero results, or
    exactly one small page), showing disabled Page 1 controls is just
    confusing UI with nothing real behind it. */}
              {(googlePages.length > 1 || googleNextToken) && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="mr-3 font-medium text-sm text-white">
                    Page {googlePageIndex + 1}
                  </span>

                  <button
                    onClick={() => goToGooglePage(googlePageIndex - 1)}
                    disabled={googlePageIndex === 0 || isLoadingGooglePage}
                    aria-label="Previous page"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-lg text-white transition-all duration-200 hover:cursor-pointer hover:border-white/20 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ‹
                  </button>

                  <button
                    onClick={() => goToGooglePage(googlePageIndex + 1)}
                    disabled={
                      (googlePageIndex + 1 >= googlePages.length &&
                        !googleNextToken) ||
                      isLoadingGooglePage
                    }
                    aria-label="Next page"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-lg text-white transition-all duration-200 hover:cursor-pointer hover:border-white/20 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ›
                  </button>
                </div>
              )}
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
