"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchDisplayProps } from "@/types";
import SearchDisplay from "@/components/search-display";

export default function Page() {
  const [googleResponse, setGoogleResponse] = useState<SearchDisplayProps[]>(
    [],
  );
  const [dbResponse, setDbResponse] = useState<SearchDisplayProps[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      fetch(`/api/search?query=${query}`)
        .then((response) => {
          if (!response.ok) {
            console.log("Network request failed", response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Search results:", data);
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
      <div className="grid md:grid-cols-2">
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
      <h2 className="text-lg">All results (not yet on our database)</h2>

      <div className="grid md:grid-cols-2">
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
