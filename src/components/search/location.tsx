'use client'

import { useLocation } from '@/contexts/location-context'

export default function Location() {
  const { status, requestLocation } = useLocation()

  if (status === 'idle') {
    return null
  }

  if (status === 'requesting') {
    return (
      <p className="-mt-4 mb-4 text-xs sm:text-sm">
        Requesting location for better results...
      </p>
    )
  }

  if (status === 'granted') {
    return (
      <p className="-mt-4 mb-4 text-green-600 text-xs sm:text-sm">
        Showing results near you
      </p>
    )
  }

  if (status === 'denied') {
    return (
      <p className="-mt-4 mb-4 text-amber-600 text-xs sm:text-sm">
        Location access denied. Showing general results.
      </p>
    )
  }

  if (status === 'unavailable') {
    return (
      <p className="-mt-4 mb-4 text-amber-600 text-xs sm:text-sm">
        Location unavailable. Showing general results.
      </p>
    )
  }

  if (status === 'timeout') {
    return (
      <p className="-mt-4 mb-4 text-amber-600 text-xs sm:text-sm">
        Location request timed out.{' '}
        <button
          onClick={requestLocation}
          className="underline hover:no-underline"
        >
          Try again
        </button>
      </p>
    )
  }

  return null
}
