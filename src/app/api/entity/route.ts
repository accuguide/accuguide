import { db } from "@/db";
import { Entity, entityTable, ZodTypeEnum } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const googleId = searchParams.get("googleId") || "";

  // Check if the data already exists in the database
  const existingData = await db
    .select()
    .from(entityTable)
    .where(eq(entityTable.googleId, googleId))
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
  const url = `https://places.googleapis.com/v1/places/${googleId}?fields=${fields}&key=${apiKey}`;
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
    let newType;
    const typeFix = googleResponse.primaryTypeDisplayName?.text || "Other";
    switch (true) {
      case typeFix.includes("Restaurant"):
        newType = ZodTypeEnum.Enum["Restaurant"];
        break;
      case typeFix.includes("Movie"):
        newType = ZodTypeEnum.Enum["Cinema"];
        break;
      case typeFix.includes("Cafe"):
        newType = ZodTypeEnum.Enum["Cafe"];
        break;
      case typeFix.includes("Bar"):
        newType = ZodTypeEnum.Enum["Bar"];
        break;
      case typeFix.includes("Store"):
        newType = ZodTypeEnum.Enum["Store"];
        break;
      case typeFix.includes("Government Office"):
        newType = ZodTypeEnum.Enum["Government Office"];
        break;
      case typeFix.includes("University"):
        newType = ZodTypeEnum.Enum["University"];
        break;
      case typeFix.includes("School"):
        newType = ZodTypeEnum.Enum["School"];
        break;
      case typeFix.includes("Hospital"):
      case typeFix.includes("Health"):
      case typeFix.includes("Pharmacy"):
        newType = ZodTypeEnum.Enum["Healthcare"];
        break;
      case typeFix.includes("Stadium"):
        newType = ZodTypeEnum.Enum["Venue"];
        break;
      default:
        newType = ZodTypeEnum.Enum["Other"];
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
      displayType: typeFix,
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
