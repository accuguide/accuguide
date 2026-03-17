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
  // Only use one state variable for results, due to pagination combining db and google responses
  const [results, setResults] = useState<SearchDisplayProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const { latitude, longitude, isLocationChecked } = useLocation()
  const [locations, setLocations] = useState<PointOfInterest[]>([])
  // new state variables for pagination
  const [currentPage, setCurrentPage] = useState(1) // consts to track current page of user
  const [totalPages, setTotalPages] = useState(1) // consts to save total number of pages

  // troubleshooting
  const [totalResults, setTotalResults] = useState(1)

  useEffect(() => {
    if (!query || !isLocationChecked) {
      return
    }

    setIsLoading(true)

    const params = new URLSearchParams({ query })
    if (latitude !== null && longitude !== null) {
      params.append('latitude', latitude.toString())
      params.append('longitude', longitude.toString())
    }

    fetch(`/api/search/?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          console.error(`[search] error calling /api/search`)
        }
        return response.json()
      })
      .then((data) => {
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
        setLocations(tempLocations)
      })
      .catch((error) => {
        console.error(`[search] error ${error}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [query, latitude, longitude, isLocationChecked, currentPage]) // add currentPage state variable to trigger re-render on state update

  // Set current page back to default (1) when the query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [query])

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
