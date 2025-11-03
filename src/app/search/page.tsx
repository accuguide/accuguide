'use client'

import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Location from '@/components/search/location'
import SearchDisplay from '@/components/search/search-display'
import SearchSkeleton from '@/components/skeletons/search-skeleton'
import { SearchDisplayProps } from '@/lib/types'

function SearchResults() {
  const [googleResponse, setGoogleResponse] = useState<SearchDisplayProps[]>([])
  const [dbResponse, setDbResponse] = useState<SearchDisplayProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // Get latitude and longitude from cookies
      const latitude = Cookies.get('latitude')
      const longitude = Cookies.get('longitude')

      // Build query parameters
      const params = new URLSearchParams({ query })
      if (latitude) params.append('latitude', latitude)
      if (longitude) params.append('longitude', longitude)

      fetch(`/api/search/?${params.toString()}`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setGoogleResponse(data[1].data)
          setDbResponse(data[0].data)
        })
        .catch(() => {
          console.error('There was a problem with the fetch operation')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [query])

  return (
    <div>
      <p className="-mt-4 mb-4 text-xs sm:text-sm">
        Location access may be granted to show more relevant results
      </p>

      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <>
          <h2 className="mb-4 mt-8">Catalogued Results</h2>

          <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {dbResponse.map((place) => (
              <SearchDisplay
                displayType="db"
                key={place.googleId}
                id={place.id}
                googleId={place.googleId}
                name={place.name}
                type={place.type}
                address={place.address}
              />
            ))}
          </div>
          <h2 className="mb-4 mt-8">All Results</h2>
          <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {googleResponse.map((place) => (
              <SearchDisplay
                displayType="google"
                key={place.googleId}
                googleId={place.googleId}
                name={place.name}
                type={place.type}
                address={place.address}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <SearchResults />
      <Location />
    </Suspense>
  )
}
