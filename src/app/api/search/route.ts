import { count, sql } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'
import { GoogleSearchResponse, SearchDisplayType } from '@/lib/types'

// Maximum search result per page for pagination
const ITEMS_PER_PAGE = 18

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || ''
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')
    const curPage = parseInt(searchParams.get('page') || '1', 10)

    // --- Filters: type, city, state (support comma-separated lists) ---
    const parseList = (v: string | null) =>
      (v || '')
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)

    const typeFilters = parseList(searchParams.get('type'))
    const cityFilters = parseList(searchParams.get('city'))
    const stateFilters = parseList(searchParams.get('state'))

    const apiKey = process.env.BACKEND_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 })
    }

    // Build URL with optional location parameters
    // We keep Google Text Search unmodified by filters for consistent behavior and apply filters after fetch.
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query,
    )}&key=${apiKey}`

    if (latitude && longitude) {
      url += `&location=${encodeURIComponent(latitude)},${encodeURIComponent(
        longitude,
      )}&radius=5000`
    }

    const response = await fetch(url)
    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            '[api/search GET] error: Failed to fetch data from Google Places API',
        },
        { status: response.status },
      )
    }

    const googleResponse = await response.json()
    console.log(googleResponse)
    // Format Google results
    let formattedGoogleResponse: SearchDisplayType[] = (
      googleResponse.results || []
    ).map((place: GoogleSearchResponse) => ({
      googleId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      type: (place.types && place.types[0]) || 'unknown',
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    }))

    // --- Apply filters to Google results (post-fetch) ---
    if (typeFilters.length > 0) {
      formattedGoogleResponse = formattedGoogleResponse.filter((p) =>
        typeFilters.includes(String(p.type || '').toLowerCase()),
      )
    }

    if (cityFilters.length > 0) {
      const cityMatch = (addr: string) => {
        const lower = (addr || '').toLowerCase()
        return cityFilters.some((c) => lower.includes(c))
      }
      formattedGoogleResponse = formattedGoogleResponse.filter((p) =>
        cityMatch(p.address || ''),
      )
    }

    if (stateFilters.length > 0) {
      const stateMatch = (addr: string) => {
        const lower = (addr || '').toLowerCase()
        return stateFilters.some((s) => lower.includes(s))
      }
      formattedGoogleResponse = formattedGoogleResponse.filter((p) =>
        stateMatch(p.address || ''),
      )
    }

    // Prepare DB results
    const formattedQuery = query.replace(/\s+/g, ' & ') + ':*'
    let formattedDbResponse: SearchDisplayType[] = []

    const dbCount = await db.select({ count: count() }).from(entityTable)
    if (dbCount[0].count !== 0) {
      // Keep your existing full-text search condition
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

      // --- Apply filters to DB results (in-memory, case-insensitive) ---
      if (typeFilters.length > 0) {
        formattedDbResponse = formattedDbResponse.filter((p) =>
          typeFilters.includes(String(p.type || '').toLowerCase()),
        )
      }
      if (cityFilters.length > 0) {
        formattedDbResponse = formattedDbResponse.filter(
          (p) =>
            cityFilters.includes(String((p as any).city || '').toLowerCase()) ||
            // Fallback: try address text contains city (covers formatting variations)
            cityFilters.some((c) =>
              (p.address || '').toLowerCase().includes(c),
            ),
        )
      }
      if (stateFilters.length > 0) {
        formattedDbResponse = formattedDbResponse.filter(
          (p) =>
            stateFilters.includes(
              String((p as any).state || '').toLowerCase(),
            ) ||
            stateFilters.some((s) =>
              (p.address || '').toLowerCase().includes(s),
            ),
        )
      }
    }

    // De-duplicate: prefer DB entries over Google entries by googleId
    const dbIds = new Set(formattedDbResponse.map((place) => place.googleId))
    const filteredGoogleResponse = formattedGoogleResponse.filter(
      (place) => !dbIds.has(place.googleId),
    )

    // Combine for pagination
    const combined: SearchDisplayType[] = [
      ...formattedDbResponse,
      ...filteredGoogleResponse,
    ]

    const totalResults = combined.length
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)
    const offset = (curPage - 1) * ITEMS_PER_PAGE
    const paginated = combined.slice(offset, offset + ITEMS_PER_PAGE)

    return NextResponse.json(
      {
        data: paginated,
        totalResults,
        curPage,
        totalPages,
        appliedFilters: {
          type: typeFilters,
          city: cityFilters,
          state: stateFilters,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: `[api/search GET] error: ${error}` })
  }
}
;``
