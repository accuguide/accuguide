'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import MapComponent from '@/components/map'
import Location from '@/components/search/location'
import SearchDisplay from '@/components/search/search-display'
import SearchSkeleton from '@/components/skeletons/search-skeleton'
import { Button } from '@/components/ui/button'
import { useLocation } from '@/contexts/location-context'
import type {
  PointOfInterest,
  SearchApiResponse,
  SearchDisplayType,
} from '@/lib/types'

function SearchResults() {
<<<<<<< issue-205
  const [googleResponse, setGoogleResponse] = useState<SearchDisplayType[]>([])
  const [dbResponse, setDbResponse] = useState<SearchDisplayType[]>([])
=======
  // Only use one state variable for results, due to pagination combining db and google responses
  const [results, setResults] = useState<SearchDisplayProps[]>([])
>>>>>>> beta
  const [isLoading, setIsLoading] = useState(false)
  // These values come from the backend and describe pagination across the
  // combined DB + Google result stream.
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const searchParams = useSearchParams()
  const searchParamsString = searchParams.toString()
  const pathname = usePathname()
  const router = useRouter()
  const query = searchParams.get('query')
  const requestedPage = Math.max(
    1,
    Number.parseInt(searchParams.get('page') || '1', 10) || 1,
  )
  const { latitude, longitude, isLocationChecked } = useLocation()
  const [locations, setLocations] = useState<PointOfInterest[]>([])
  // new state variables for pagination
  const [currentPage, setCurrentPage] = useState(1) // consts to track current page of user
  const [totalPages, setTotalPages] = useState(1) // consts to save total number of pages

  // troubleshooting
  const [totalResults, setTotalResults] = useState(1)

  useEffect(() => {
    // Reset all search-related state if a query is missing or location gate
    // has not been resolved yet.
    if (!query || !isLocationChecked) {
      setGoogleResponse([])
      setDbResponse([])
      setLocations([])
      setCurrentPage(1)
      setTotalPages(0)
      setTotalResults(0)
      setHasPreviousPage(false)
      setHasNextPage(false)
      return
    }

    setIsLoading(true)

    // Request only one page from the backend. The API applies pagination over
    // the combined results, then returns each source split for display.
    const params = new URLSearchParams({
      query,
      page: requestedPage.toString(),
    })
    if (latitude !== null && longitude !== null) {
      params.append('latitude', latitude.toString())
      params.append('longitude', longitude.toString())
    }

    fetch(`/api/search/?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `[search] error calling /api/search with status ${response.status}`,
          )
        }
        return response.json() as Promise<SearchApiResponse>
      })
      .then((data) => {
<<<<<<< issue-205
        // Keep source buckets separate for section rendering, while the page
        // metadata below reflects both sources combined.
        setGoogleResponse(data.data.google)
        setDbResponse(data.data.database)
        setCurrentPage(data.page)
        setTotalPages(data.totalPages)
        setTotalResults(data.totalResults)
        setHasPreviousPage(data.hasPreviousPage)
        setHasNextPage(data.hasNextPage)

        const tempLocations: PointOfInterest[] = [
          ...data.data.database.map(
            (place: {
              name: string
              address: string
              lat: number
              lng: number
            }) => ({
              key: `${place.name}-${place.address}`,
              name: place.name,
              address: place.address,
              location: { lat: place.lat, lng: place.lng },
            }),
          ),
          ...data.data.google.map(
            (place: {
              name: string
              address: string
              lat: number
              lng: number
            }) => ({
              key: `${place.name}-${place.address}`,
              name: place.name,
              address: place.address,
              location: { lat: place.lat, lng: place.lng },
            }),
          ),
        ]
=======
        setResults(data.data)
        setTotalPages(data.totalPages)
        setTotalResults(data.totalResults)

        const tempLocations: PointOfInterest[] = data.data.map(
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
>>>>>>> beta
        setLocations(tempLocations)

        // If a user asks for an out-of-range page, backend clamps it. Mirror
        // that value in the URL so refresh/share keeps the canonical page.
        if (data.page !== requestedPage) {
          const normalizedParams = new URLSearchParams(searchParamsString)
          normalizedParams.set('page', data.page.toString())
          router.replace(`${pathname}?${normalizedParams.toString()}`)
        }
      })
      .catch((error) => {
        console.error(`[search] error ${error}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
<<<<<<< issue-205
  }, [
    query,
    requestedPage,
    latitude,
    longitude,
    isLocationChecked,
    pathname,
    router,
    searchParamsString,
  ])

  const updatePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) {
      return
    }

    // Drive pagination through the URL so navigation is shareable and the
    // data fetch is naturally retriggered by search param changes.
    const nextParams = new URLSearchParams(searchParamsString)
    nextParams.set('page', nextPage.toString())
    router.push(`${pathname}?${nextParams.toString()}`)
  }

  const visibleResultCount = dbResponse.length + googleResponse.length
  const combinedResults = [
    ...dbResponse.map((place) => ({
      ...place,
      displayType: 'db',
    })),
    ...googleResponse.map((place) => ({
      ...place,
      displayType: 'google',
    })),
  ]
=======
  }, [query, latitude, longitude, isLocationChecked, currentPage]) // add currentPage state variable to trigger re-render on state update

  // Set current page back to default (1) when the query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [query])
>>>>>>> beta

  return (
    <div>
      <Location />

      {isLoading ? (
        <div className="mt-8">
          <p aria-live="polite" className="mb-4 text-muted-foreground text-sm">
            Loading results...
          </p>
          <SearchSkeleton />
        </div>
      ) : (
        <div>
          {/* Compact map for small screens, shown above results */}
          <div className="mt-6 lg:hidden">
            <MapComponent locations={locations} compact />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
<<<<<<< issue-205
              <div className="mt-8 mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-muted-foreground text-sm">
                  {totalResults > 0
                    ? `Showing ${visibleResultCount} of ${totalResults} results`
                    : 'No results found'}
                </p>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updatePage(currentPage - 1)}
                      disabled={!hasPreviousPage || isLoading}
                    >
                      Previous
                    </Button>
                    <span className="min-w-24 text-center text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updatePage(currentPage + 1)}
                      disabled={!hasNextPage || isLoading}
                    >
                      Next
                    </Button>
                  </div>
                )}
=======
              <h2 className="mt-8 mb-4">Results</h2>
              <p>Results: {totalResults}</p>

              {/* navigation elements for pagination */}
              {/* only necessary when there is more than one page */}
              {totalPages > 1 && (
                <div className="mt-6 mb-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer rounded border px-3 py-1 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer rounded border px-3 py-1 ${
                          page === currentPage ? 'bg-black text-white' : ''
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer rounded border px-3 py-1 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((place) => (
                  <SearchDisplay key={place.id ?? place.googleId} {...place} />
                ))}
>>>>>>> beta
              </div>

              {totalResults > 0 && (
                <>
                  <h2 className="mb-4">Results</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {combinedResults.map((place) => (
                      <SearchDisplay
                        displayType={place.displayType}
                        key={`${place.displayType}-${place.googleId}-${place.address}`}
                        id={place.id}
                        googleId={place.googleId}
                        name={place.name}
                        type={place.type}
                        address={place.address}
                        aiScore={place.aiScore || 0}
                      />
                    ))}
                  </div>
                </>
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
