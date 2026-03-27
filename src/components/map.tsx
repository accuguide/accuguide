'use client'

import { AdvancedMarker, InfoWindow, Map, Pin } from '@vis.gl/react-google-maps'
import { useCallback, useState } from 'react'
import type { PointOfInterest } from '@/lib/types'

interface MapComponentProps {
  locations: PointOfInterest[]
  compact?: boolean
}

function calculateOptimalZoom(
  locations: PointOfInterest[],
  mapWidth: number,
  mapHeight: number,
): number {
  if (locations.length === 0) return 12
  if (locations.length === 1) return 14

  const lats = locations.map((l) => l.location.lat)
  const lngs = locations.map((l) => l.location.lng)

  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  const latDiff = maxLat - minLat
  const lngDiff = maxLng - minLng

  if (latDiff === 0 && lngDiff === 0) return 14

  const WORLD_DIM = 256
  const ZOOM_MAX = 18

  const latRad = (lat: number) => Math.sin((lat * Math.PI) / 180)
  const latFraction = Math.abs(latRad(maxLat) - latRad(minLat)) / Math.PI
  const lngFraction = lngDiff / 360

  const latZoom =
    latFraction > 0
      ? Math.floor(Math.log2(mapHeight / WORLD_DIM / latFraction))
      : ZOOM_MAX
  const lngZoom =
    lngFraction > 0
      ? Math.floor(Math.log2(mapWidth / WORLD_DIM / lngFraction))
      : ZOOM_MAX

  // Subtract 1 for padding around markers
  return Math.max(1, Math.min(latZoom, lngZoom, ZOOM_MAX) - 1)
}

export default function MapComponent({
  locations,
  compact = false,
}: MapComponentProps) {
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null)

  const center = {
    lat:
      locations.reduce((sum, loc) => sum + loc.location.lat, 0) /
      locations.length,
    lng:
      locations.reduce((sum, loc) => sum + loc.location.lng, 0) /
      locations.length,
  }
  // Approximate map dimensions based on viewport units
  const mapWidth = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 800
  const mapHeight =
    typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400
  const zoom = calculateOptimalZoom(locations, mapWidth, mapHeight)

  const handleMarkerClick = useCallback((poi: PointOfInterest) => {
    setSelectedPoi((prev) => (prev?.key === poi.key ? null : poi))
  }, [])

  return (
    <Map
      style={{
        width: compact ? '100%' : '40vw',
        height: compact ? '250px' : '96vh',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
      defaultCenter={{ lat: center.lat, lng: center.lng }}
      defaultZoom={zoom + 1}
      gestureHandling="greedy"
      disableDefaultUI
      mapId="b855f3d0f7e0d031ab47403b"
      onClick={() => setSelectedPoi(null)}
    >
      {locations.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          onClick={() => handleMarkerClick(poi)}
        >
          <Pin />
        </AdvancedMarker>
      ))}

      {selectedPoi && (
        <InfoWindow
          position={selectedPoi.location}
          onCloseClick={() => setSelectedPoi(null)}
          pixelOffset={[0, -40]}
          headerDisabled
        >
          <div
            style={{ maxWidth: 200, position: 'relative', paddingRight: 16 }}
          >
            <button
              type="button"
              onClick={() => setSelectedPoi(null)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: 18,
                lineHeight: 1,
                color: '#333',
              }}
              aria-label="Close"
            >
              &#x2715;
            </button>
            <strong style={{ color: '#000' }}>{selectedPoi.name}</strong>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#666' }}>
              {selectedPoi.address}
            </p>
          </div>
        </InfoWindow>
      )}
    </Map>
  )
}
