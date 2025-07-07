"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { SearchDisplayProps } from "@/types";
import SearchDisplay from "@/components/search-display";

function SearchResults() {
  const [googleResponse, setGoogleResponse] = useState<SearchDisplayProps[]>(
    [],
  );
  const [dbResponse, setDbResponse] = useState<SearchDisplayProps[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      // Get latitude and longitude from cookies
      const latitude = Cookies.get("latitude");
      const longitude = Cookies.get("longitude");

      // Build query parameters
      const params = new URLSearchParams({ query });
      if (latitude) params.append("latitude", latitude);
      if (longitude) params.append("longitude", longitude);

      fetch(`/api/search/?${params.toString()}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setGoogleResponse(data[1].data);
          setDbResponse(data[0].data);
        })
        .catch(() => {
          console.error("There was a problem with the fetch operation");
        });
    }
  }, [query]);

  return (
    <div>
      <h2 className="mt-2 my-4">Results</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {dbResponse.map((place) => (
          <SearchDisplay
            displayType="db"
            key={place.googleId}
            id={place.id}
            googleId={place.googleId}
            name={place.name}
            type={place.type}
            address={place.address}
          />
        ))}
      </div>
      <h2 className="mt-2 my-4">All Google Results</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {googleResponse.map((place) => (
          <SearchDisplay
            displayType="google"
            key={place.googleId}
            googleId={place.googleId}
            name={place.name}
            type={place.type}
            address={place.address}
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
