'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Location from '@/components/search/location'
import SearchDisplay from '@/components/search/search-display'
import SearchSkeleton from '@/components/skeletons/search-skeleton'
import { useLocation } from '@/contexts/location-context'
import { SearchDisplayProps } from '@/lib/types'

function SearchResults() {
  const [googleResponse, setGoogleResponse] = useState<SearchDisplayProps[]>([])
  const [dbResponse, setDbResponse] = useState<SearchDisplayProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const { latitude, longitude, isLocationChecked } = useLocation()

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
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setGoogleResponse(data[1].data)
        setDbResponse(data[0].data)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [query, latitude, longitude, isLocationChecked])

  return (
    <div>
      <Location />

      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <>
          <h2 className="mt-8 mb-4">Catalogued Results</h2>

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
                aiScore={place.aiScore || 0}
              />
            ))}
          </div>
          <h2 className="mt-8 mb-4">All Results</h2>
          <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {googleResponse.map((place) => (
              <SearchDisplay
                displayType="google"
                key={place.googleId}
                googleId={place.googleId}
                name={place.name}
                type={place.type}
                address={place.address}
                aiScore={0}
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
    </Suspense>
  )
}
