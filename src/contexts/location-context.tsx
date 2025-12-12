'use client'

import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type LocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable' | 'timeout'

interface LocationContextValue {
  latitude: number | null
  longitude: number | null
  status: LocationStatus
  isLocationChecked: boolean
  requestLocation: () => void
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined)

const LOCATION_TIMEOUT_MS = 5000
const COOKIE_EXPIRY_DAYS = 30

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [status, setStatus] = useState<LocationStatus>('idle')
  const [isLocationChecked, setIsLocationChecked] = useState(false)

  const requestLocation = useCallback(() => {
    if (status === 'requesting') return

    if (!navigator.geolocation) {
      setStatus('unavailable')
      setIsLocationChecked(true)
      return
    }

    setStatus('requesting')
    let timeoutId: NodeJS.Timeout | null = null

    const handleSuccess = (position: GeolocationPosition) => {
      if (timeoutId) clearTimeout(timeoutId)
      
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      setLatitude(lat)
      setLongitude(lng)
      setStatus('granted')
      setIsLocationChecked(true)

      Cookies.set('latitude', lat.toString(), {
        expires: COOKIE_EXPIRY_DAYS,
        secure: true,
        sameSite: 'Lax',
      })
      Cookies.set('longitude', lng.toString(), {
        expires: COOKIE_EXPIRY_DAYS,
        secure: true,
        sameSite: 'Lax',
      })
    }

    const handleError = (error: GeolocationPositionError) => {
      if (timeoutId) clearTimeout(timeoutId)

      if (error.code === error.PERMISSION_DENIED) {
        setStatus('denied')
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        setStatus('unavailable')
      } else if (error.code === error.TIMEOUT) {
        setStatus('timeout')
      } else {
        setStatus('denied')
      }
      setIsLocationChecked(true)
    }

    timeoutId = setTimeout(() => {
      setStatus('timeout')
      setIsLocationChecked(true)
    }, LOCATION_TIMEOUT_MS)

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: LOCATION_TIMEOUT_MS,
      enableHighAccuracy: false,
      maximumAge: 300000,
    })
  }, [status])

  useEffect(() => {
    const storedLatitude = Cookies.get('latitude')
    const storedLongitude = Cookies.get('longitude')

    if (storedLatitude && storedLongitude) {
      const lat = parseFloat(storedLatitude)
      const lng = parseFloat(storedLongitude)

      if (!isNaN(lat) && !isNaN(lng)) {
        setLatitude(lat)
        setLongitude(lng)
        setStatus('granted')
        setIsLocationChecked(true)
      } else {
        Cookies.remove('latitude')
        Cookies.remove('longitude')
        setIsLocationChecked(true)
      }
    } else {
      setIsLocationChecked(true)
    }
  }, [])

  useEffect(() => {
    if (isLocationChecked && status === 'idle') {
      requestLocation()
    }
  }, [isLocationChecked, status, requestLocation])

  const value: LocationContextValue = {
    latitude,
    longitude,
    status,
    isLocationChecked,
    requestLocation,
  }

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
