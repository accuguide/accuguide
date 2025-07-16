import { db } from "@/lib/db";
import { Entity, entityTable } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { validate as isUuid } from "uuid"; // Import UUID validation function

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const googleId = searchParams.get("googleId") || "";
  if (isUuid(googleId)) {
    const existingData = await db
      .select()
      .from(entityTable)
      .where(eq(entityTable.id, googleId))
      .execute();

    if (existingData.length > 0) {
      // If data exists, return it immediately
      return NextResponse.json(existingData, { status: 200 });
    }
  }
  // Check if the data already exists in the database

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }
  const fields =
    "id,postalAddress,location,timeZone,googleMapsUri,websiteUri,regularOpeningHours,utcOffsetMinutes,displayName,primaryTypeDisplayName,editorialSummary";
  const url = `https://places.googleapis.com/v1/places/${googleId}?fields=${fields}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from Google Places API" },
        { status: response.status },
      );
    }

    const googleResponse = await response.json();
    let newType: string;
    const typeFix =
      googleResponse.primaryTypeDisplayName?.text.toLowerCase() || "other";
    switch (true) {
      case typeFix.includes("restaurant"):
        newType = "Restaurant";
        break;
      case typeFix.includes("movie"):
        newType = "Cinema";
        break;
      case typeFix.includes("cafe"):
        newType = "Cafe";
        break;
      case typeFix.includes("bar"):
        newType = "Bar";
        break;
      case typeFix.includes("store"):
        newType = "Store";
        break;
      case typeFix.includes("government office"):
        newType = "Government Office";
        break;
      case typeFix.includes("university"):
        newType = "University";
        break;
      case typeFix.includes("school"):
        newType = "School";
        break;
      case typeFix.includes("hospital"):
      case typeFix.includes("health"):
      case typeFix.includes("pharmacy"):
        newType = "Healthcare";
        break;
      case typeFix.includes("stadium"):
        newType = "Venue";
        break;
      default:
        newType = "Other";
        break;
    }

    const formattedResponse: Entity = {
      googleId: googleResponse.id,
      id: uuidv4(),
      lat: googleResponse.location.latitude,
      lon: googleResponse.location.longitude,
      maps: googleResponse.googleMapsUri,
      url: googleResponse.websiteUri || "",
      hours: googleResponse.regularOpeningHours?.weekdayDescriptions || [],
      name: googleResponse.displayName.text,
      type: newType,
      displayType: googleResponse.primaryTypeDisplayName?.text || "Other",
      description: googleResponse.editorialSummary?.text || "",
      timeZone: googleResponse.timeZone?.id || "",
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
      .where(eq(entityTable.googleId, googleId))
      .execute();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error },
      { status: 500 },
    );
  }
}
