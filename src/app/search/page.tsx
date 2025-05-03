"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchDisplayType } from "@/types";
import SearchDisplay from "@/components/search-display";
import Title from "@/components/title";

export default function Page() {
  const [googleResponse, setGoogleResponse] = useState<SearchDisplayType[]>([]);
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
          console.log("Search results:", data[1]);
          setGoogleResponse(data[1].data);
        })
        .catch(() => {
          console.error("There was a problem with the fetch operation");
        });
    }
  }, [query]);

  return (
    <div>
      <Title>Search</Title>
      <div className="grid md:grid-cols-2">
        {googleResponse.map((place) => (
          <SearchDisplay
            key={place.id}
            id={place.id}
            name={place.name}
            type={place.type}
            address={place.address}
          />
        ))}
      </div>
    </div>
  );
}
