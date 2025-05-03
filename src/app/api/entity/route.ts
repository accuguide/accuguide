import { db } from "@/db";
import { Entity, entityTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") || "";

  // Check if the data already exists in the database
  const existingData = await db
    .select()
    .from(entityTable)
    .where(eq(entityTable.id, id))
    .execute();

  if (existingData.length > 0) {
    // If data exists, return it immediately
    return NextResponse.json(existingData, { status: 200 });
  }

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
    let newType = "";
    const typeFix = googleResponse.primaryTypeDisplayName?.text || "Other";
    if (typeFix.includes("Restaurant")) newType = "Restaurant";
    else newType = "Other";

    const formattedResponse: Entity = {
      id: googleResponse.id,
      lat: googleResponse.location.latitude,
      lon: googleResponse.location.longitude,
      maps: googleResponse.googleMapsUri,
      url: googleResponse.websiteUri || "",
      hours: googleResponse.regularOpeningHours?.weekdayDescriptions || [],
      name: googleResponse.displayName.text,
      type: newType,
      displayType: typeFix,
      description: googleResponse.editorialSummary?.text || "",
      utc: googleResponse.utcOffsetMinutes,
      country: googleResponse.postalAddress.regionCode || "",
      zip: googleResponse.postalAddress.postalCode || "",
      state: googleResponse.postalAddress.administrativeArea || "",
      city: googleResponse.postalAddress.locality || "",
      address1: googleResponse.postalAddress.addressLines[0] || "",
      address2: googleResponse.postalAddress.addressLines[1] || "",
      createdAt: new Date(),
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
