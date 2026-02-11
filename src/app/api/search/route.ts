import { count, sql } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'
import { GoogleSearchResponse, SearchDisplayType } from '@/lib/types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query') || ''
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 })
  }

  // Build URL with optional location parameters
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`

  // Only add location and radius if both latitude and longitude are provided
  if (latitude && longitude) {
    url += `&location=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&radius=5000`
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from Google Places API' },
        { status: response.status },
      )
    }

    const googleResponse = await response.json()
    const formattedGoogleResponse: SearchDisplayType[] =
      googleResponse.results.map((place: GoogleSearchResponse) => ({
        googleId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        type: place.types[0],
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      }))

    const formattedQuery = query.replace(/\s+/g, ' & ') + ':*'
    let formattedDbResponse: SearchDisplayType[] = []
    const dbCount = await db.select({ count: count() }).from(entityTable)
    if (dbCount[0].count !== 0) {
      const searchDbQuery = sql`(
        setweight(to_tsvector('english', ${entityTable.name}), 'A') ||
        setweight(to_tsvector('english', ${entityTable.city}), 'A') ||
        setweight(to_tsvector('english', ${entityTable.state || ''}), 'A') ||
        setweight(to_tsvector('english', ${entityTable.displayType}), 'A') ||
        setweight(to_tsvector('english', ${entityTable.type}), 'B') ||
        setweight(to_tsvector('english', ${entityTable.description || ''}), 'B')

        @@ to_tsquery('english', ${formattedQuery})
      )`
      const dbResponse = await db
        .select()
        .from(entityTable)
        .where(searchDbQuery)

      formattedDbResponse = dbResponse.map((place) => ({
        id: place.id,
        googleId: place.googleId,
        name: place.name,
        address: `${place.address1} ${place.address2 || ''}, ${place.city}, ${place.state}, ${place.zip}`,
        type: place.displayType,
        lat: Number(place.lat),
        lng: Number(place.lon),
        aiScore: place.aiScore || 0,
      }))
    }

    const dbIds = new Set(formattedDbResponse.map((place) => place.googleId))
    const filteredGoogleResponse = formattedGoogleResponse.filter(
      (place) => !dbIds.has(place.googleId),
    )
    const combinedResponse = [
      {
        loc: 'database',
        data: formattedDbResponse,
      },
      {
        loc: 'google',
        data: filteredGoogleResponse,
      },
    ]
    return NextResponse.json(combinedResponse, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching data', message: error },
      { status: 500 },
    )
  }
}
