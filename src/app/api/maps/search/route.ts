import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.MAPS_API_KEY; // Ensure this matches your .env variable name
  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Spicy%20Vegetarian%20Food%20in%20Sydney%20Australia&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(response);
      return NextResponse.json(
        { error: "Failed to fetch data from Google Places API" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching data", message: error },
      { status: 500 },
    );
  }
}
