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
  const [googleResponse, setGoogleResponse] = useState<SearchDisplayProps[]>([])
  const [dbResponse, setDbResponse] = useState<SearchDisplayProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const { latitude, longitude, isLocationChecked } = useLocation()
  const [locations, setLocations] = useState<PointOfInterest[]>([])

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
              <h2 className="mt-8 mb-4">All Results</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {googleResponse.map((place) => (
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
