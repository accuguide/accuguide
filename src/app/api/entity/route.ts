import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { validate as isUuid, v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { Entity, entityTable, typeMappingTable } from "@/lib/db/schema";

async function getTypeFromMapping(primaryTypeText: string): Promise<string> {
  const lowercaseType = primaryTypeText.toLowerCase();

  // Get all type mappings ordered by priority (highest first)
  const mappings = await db
    .select()
    .from(typeMappingTable)
    .orderBy(desc(typeMappingTable.priority));

  // Find the first matching pattern
  for (const mapping of mappings) {
    if (lowercaseType.includes(mapping.pattern.toLowerCase())) {
      return mapping.type;
    }
  }

  // Default fallback
  return "Other";
}

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
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(googleId)}?fields=${encodeURIComponent(fields)}&key=${encodeURIComponent(apiKey)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from Google Places API" },
        { status: response.status },
      );
    }

    const googleResponse = await response.json();
    const typeFix = googleResponse.primaryTypeDisplayName?.text || "other";

    // Use dynamic type mapping from database
    const newType = await getTypeFromMapping(typeFix);

    const formattedResponse: Entity = {
      googleId: googleResponse.id,
      id: uuidv4(),
      lat: googleResponse.location?.latitude,
      lon: googleResponse.location?.longitude,
      maps: googleResponse.googleMapsUri,
      url: googleResponse.websiteUri || "",
      hours: googleResponse.regularOpeningHours?.weekdayDescriptions || [],
      name: googleResponse.displayName?.text,
      type: newType,
      displayType: googleResponse.primaryTypeDisplayName?.text || "Other",
      description: googleResponse.editorialSummary?.text || "",
      timeZone: googleResponse.timeZone?.id || "",
      country: googleResponse.postalAddress?.regionCode || "",
      zip: googleResponse.postalAddress?.postalCode || "",
      state: googleResponse.postalAddress?.administrativeArea || "",
      city: googleResponse.postalAddress?.locality || "",
      address1: googleResponse.postalAddress?.addressLines?.[0] || "",
      address2: googleResponse.postalAddress?.addressLines?.[1] || "",
      createdAt: new Date(),
      aiScore: null,
      aiSummary: null,
      aiIndicators: null,
      aiUpdatedAt: null,
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
    console.error("Error occurred while processing request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error },
      { status: 500 },
    );
  }
}
