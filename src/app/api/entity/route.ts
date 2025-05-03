import { db } from "@/db";
import { Entity, entityTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") || "";

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }
  const fields =
    "id,postalAddress,location,timeZone,googleMapsUri,websiteUri,regularOpeningHours,utcOffsetMinutes,displayName,primaryTypeDisplayName,editorialSummary";
  const url = `https://places.googleapis.com/v1/places/${id}?fields=${fields}&key=${apiKey}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(response);
      return NextResponse.json(
        { error: "Failed to fetch data from Google Places API" },
        { status: response.status },
      );
    }

    const googleResponse = await response.json();
    const formattedResponse: Entity = {
      id: googleResponse.id,
      lat: googleResponse.location.latitude,
      lon: googleResponse.location.longitude,
      maps: googleResponse.googleMapsUri,
      url: googleResponse.websiteUri || null,
      hours: googleResponse.regularOpeningHours?.weekdayDescriptions || null,
      name: googleResponse.displayName.text,
      type: googleResponse.primaryTypeDisplayName?.text || "other",
      description: googleResponse.editorialSummary?.text || null,
      utc: googleResponse.utcOffsetMinutes,
      country: googleResponse.postalAddress.regionCode || null,
      zip: googleResponse.postalAddress.postalCode || null,
      state: googleResponse.postalAddress.administrativeArea || null,
      city: googleResponse.postalAddress.locality || null,
      address1: googleResponse.postalAddress.addressLines[0] || null,
      address2: googleResponse.postalAddress.addressLines[1] || null,
    };

    await db
      .insert(entityTable)
      .values(formattedResponse)
      .onConflictDoNothing();
    const data = await db
      .select()
      .from(entityTable)
      .where(eq(entityTable.id, id))
      .execute();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error },
      { status: 500 },
    );
  }
}
