"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

export type SearchProps = {
  size: "half" | "full" | "page";
};

export default function Search({ size }: SearchProps) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    window.location.href = `/search?query=${encodedQuery}`;
  }

  return (
    <>
      {!(pathname === "/" && size === "half") && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={cn(
            size === "half"
              ? "pl-4"
              : size === "full"
                ? "w-[90%] md:w-[50%]"
                : "w-[80%]",
          )}
        >
          <Input
            placeholder={
              size !== "half"
                ? "Search for businesses, schools, or other places"
                : "Search"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn("", size !== "half" && "text-center")}
          />
        </form>
      )}
    </>
  );
}
