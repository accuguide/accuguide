import { db } from "@/db";
import { entityTable } from "@/db/schema";
import { GoogleSearchResponse, SearchDisplayType } from "@/types";
import { count, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from Google Places API" },
        { status: response.status },
      );
    }

    const googleResponse = await response.json();
    const formattedGoogleResponse: SearchDisplayType[] =
      googleResponse.results.map((place: GoogleSearchResponse) => ({
        googleId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        type: place.types[0],
      }));

    const formattedQuery = query.replace(/\s+/g, " & ") + ":*";
    let formattedDbResponse: SearchDisplayType[] = [];
    const dbCount = await db.select({ count: count() }).from(entityTable);
    if (dbCount[0].count !== 0) {
      const searchDbQuery = sql`(
        setweight(to_tsvector('english', ${entityTable.name}), 'A') ||
        setweight(to_tsvector('english', ${entityTable.city}), 'A') ||
        setweight(to_tsvector('english', ${entityTable.displayType}), 'A') ||
        setweight(to_tsvector('english', ${entityTable.description}), 'B')
        @@ to_tsquery('english', ${formattedQuery})
      )`;
      const dbResponse = await db
        .select()
        .from(entityTable)
        .where(searchDbQuery);

      formattedDbResponse = dbResponse.map((place) => ({
        id: place.id,
        googleId: place.googleId,
        name: place.name,
        address: `${place.address1} ${place.address2 || ""}, ${place.city}, ${place.state}, ${place.zip}`,
        type: place.displayType,
      }));
    }

    const dbIds = new Set(formattedDbResponse.map((place) => place.googleId));
    const filteredGoogleResponse = formattedGoogleResponse.filter(
      (place) => !dbIds.has(place.googleId),
    );
    const combinedResponse = [
      {
        loc: "database",
        data: formattedDbResponse,
      },
      {
        loc: "google",
        data: filteredGoogleResponse,
      },
    ];
    return NextResponse.json(combinedResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching data", message: error },
      { status: 500 },
    );
  }
}
