'use client'

import Cookies from 'js-cookie'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type LocationStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'timeout'

interface LocationContextValue {
  latitude: number | null
  longitude: number | null
  status: LocationStatus
  isLocationChecked: boolean
  requestLocation: () => void
}

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined,
)

const LOCATION_TIMEOUT_MS = 5000
const COOKIE_EXPIRY_DAYS = 30

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [status, setStatus] = useState<LocationStatus>('idle')
  const [isLocationChecked, setIsLocationChecked] = useState(false)

  const requestLocation = useCallback(() => {
  console.log('[LOCATION CONTEXT] requestLocation STARTED');
  if (status === 'requesting') {
    console.log('[LOCATION CONTEXT] Already requesting – skipping');
    return;
  }

  if (!navigator.geolocation) {
    console.log('[LOCATION CONTEXT] Geolocation unavailable');
    setStatus('unavailable');
    setIsLocationChecked(true);
    return;
  }

  console.log('[LOCATION CONTEXT] Calling getCurrentPosition...');
  setStatus('requesting');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('[LOCATION CONTEXT] SUCCESS – lat:', position.coords.latitude, 'lng:', position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setStatus('granted');
      setIsLocationChecked(true);
      // cookies set...
    },
    (error) => {
      console.log('[LOCATION CONTEXT] ERROR – code:', error.code, 'message:', error.message);
      if (error.code === 1) setStatus('denied');
      else if (error.code === 2) setStatus('unavailable');
      else if (error.code === 3) setStatus('timeout');
      setIsLocationChecked(true);
    },
    { enableHighAccuracy: false, timeout: 7000, maximumAge: 60000 }
  );
}, [status]);

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

  //the part that requests location on reload main issue fixed
  // useEffect(() => {
  //   if (isLocationChecked && status === 'idle') {
  //     requestLocation()
  //   }
  // }, [isLocationChecked, status, requestLocation])

  const value: LocationContextValue = {
    latitude,
    longitude,
    status,
    isLocationChecked,
    requestLocation,
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
