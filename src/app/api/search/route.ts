import { asc, count, sql } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'
import {
  GoogleSearchResponse,
  SearchApiResponse,
  SearchDisplayType,
} from '@/lib/types'

// A page always contains at most 18 total results across both data sources.
const PAGE_SIZE = 18

// Reuse one full-text condition for count, dedupe, and page fetches so
// pagination stays stable and consistent across all related queries.
function getSearchCondition(formattedQuery: string) {
  return sql`(
    setweight(to_tsvector('english', ${entityTable.name}), 'A') ||
    setweight(to_tsvector('english', ${entityTable.city}), 'A') ||
    setweight(to_tsvector('english', ${entityTable.state}), 'A') ||
    setweight(to_tsvector('english', ${entityTable.displayType}), 'A') ||
    setweight(to_tsvector('english', ${entityTable.type}), 'B') ||
    setweight(to_tsvector('english', ${entityTable.description}), 'B')

    @@ to_tsquery('english', ${formattedQuery})
  )`
}

// Maximum search result per page for pagination
const ITEMS_PER_PAGE = 18

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')?.trim() || ''
    const pageParam = Number.parseInt(searchParams.get('page') || '1', 10)
    const requestedPage =
      Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')
    const curPage = parseInt(searchParams.get('page') || '1', 10)
    const apiKey = process.env.BACKEND_GOOGLE_MAPS_API_KEY

    // Avoid unnecessary API/DB work for empty searches and return a typed
    // empty payload that matches the regular paginated response shape.
    if (!query) {
      const emptyResponse: SearchApiResponse = {
        page: 1,
        pageSize: PAGE_SIZE,
        totalResults: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        data: {
          database: [],
          google: [],
        },
      }

      return NextResponse.json(emptyResponse, { status: 200 })
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 })
    }

    // Build URL with optional location parameters
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`

    // Only add location and radius if both latitude and longitude are provided
    if (latitude && longitude) {
      url += `&location=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&radius=5000`
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
    // Normalize Google results to the same shape we use for DB rows so we can
    // paginate and merge both sources with one consistent data contract.
    const formattedGoogleResponse: SearchDisplayType[] = Array.isArray(
      googleResponse.results,
    )
      ? googleResponse.results.map((place: GoogleSearchResponse) => ({
          googleId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          type: place.types[0],
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        }))
      : []

    const formattedQuery = query.replace(/\s+/g, ' & ') + ':*'
    const searchCondition = getSearchCondition(formattedQuery)
    // Count only matching DB rows. This number drives page boundaries for the
    // combined stream and is also used to calculate offsets.
    const [{ count: dbCount }] = await db
      .select({ count: count() })
      .from(entityTable)
      .where(searchCondition)

    // Pull Google IDs for matching DB rows so we can remove duplicates from
    // Google's response before computing total combined results.
    const matchingDbGoogleIds = await db
      .select({ googleId: entityTable.googleId })
      .from(entityTable)
      .where(searchCondition)

    const dbIds = new Set(matchingDbGoogleIds.map((place) => place.googleId))
    const filteredGoogleResponse = formattedGoogleResponse.filter(
      (place) => !dbIds.has(place.googleId),
    )

    // Pagination is calculated over one combined list (DB + filtered Google),
    // not separately per source.
    const totalResults = dbCount + filteredGoogleResponse.length
    const totalPages = Math.ceil(totalResults / PAGE_SIZE)
    const currentPage =
      totalPages === 0 ? 1 : Math.min(requestedPage, totalPages)
    const pageOffset = (currentPage - 1) * PAGE_SIZE

    // Fill the current page from DB first. If DB cannot fully fill 18 items,
    // remaining slots are filled from Google using an adjusted Google offset.
    const dbOffset = Math.min(pageOffset, dbCount)
    const dbLimit = Math.max(0, Math.min(PAGE_SIZE, dbCount - dbOffset))

    const paginatedDbResponse =
      dbLimit > 0
        ? await db
            .select()
            .from(entityTable)
            .where(searchCondition)
            .orderBy(asc(entityTable.name))
            .offset(dbOffset)
            .limit(dbLimit)
        : []

    const remainingSlots = PAGE_SIZE - paginatedDbResponse.length
    const googleOffset = Math.max(0, pageOffset - dbCount)
    const paginatedGoogleResponse =
      remainingSlots > 0
        ? filteredGoogleResponse.slice(
            googleOffset,
            googleOffset + remainingSlots,
          )
        : []

    // Keep the source split for rendering sections in the UI while returning
    // shared pagination metadata that applies to both sections together.
    const formattedDbResponse: SearchDisplayType[] = paginatedDbResponse.map(
      (place) => ({
        id: place.id,
        googleId: place.googleId,
        name: place.name,
        address: `${place.address1} ${place.address2 || ''}, ${place.city}, ${place.state}, ${place.zip}`,
        type: place.displayType,
        lat: Number(place.lat),
        lng: Number(place.lon),
        aiScore: place.aiScore ? Number(place.aiScore) : 0,
      }),
    )
<<<<<<< issue-205

    const responseBody: SearchApiResponse = {
      page: currentPage,
      pageSize: PAGE_SIZE,
      totalResults,
      totalPages,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
      data: {
        database: formattedDbResponse,
        google: paginatedGoogleResponse,
      },
    }

    return NextResponse.json(responseBody, { status: 200 })
=======
    // combine search results to single list for pagination
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
      },
      { status: 200 },
    )
>>>>>>> beta
  } catch (error) {
    return NextResponse.json(
      { error: `[api/search GET] error: ${error}` },
      { status: 500 },
    )
  }
}
