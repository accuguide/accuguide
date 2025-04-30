"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      // Perform the search with the query
      fetch(`/api/search?query=${query}`)
        .then((response) => {
          if (!response.ok) {
            console.log("Network request failed", response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Search results:", data);
          // Handle the search results here
        })
        .catch(() => {
          console.error("There was a problem with the fetch operation");
        });
    }
  }, [query]);

  return (
    <div>
      <h1>Search</h1>
    </div>
  );
}
