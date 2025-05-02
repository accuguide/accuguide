import { GoogleSearchResponse, SearchDisplay } from "@/types";
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
    const formattedGoogleResponse: SearchDisplay[] = googleResponse.results.map(
      (place: GoogleSearchResponse) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        type: place.types[0],
      }),
    );

    const formattedDbResponse: SearchDisplay[] = [
      {
        id: "1",
        name: "Sample Place 1",
        address: "123 Sample St, Sample City, SC 12345",
        type: "restaurant",
      },
    ];

    const combinedResponse = [
      {
        loc: "database",
        data: formattedDbResponse,
      },
      {
        loc: "google",
        data: formattedGoogleResponse,
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
