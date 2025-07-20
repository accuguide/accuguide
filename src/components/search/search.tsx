"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchIcon } from "lucide-react";

export type SearchProps = {
  size: "half" | "full" | "page";
};

export default function Search({ size }: SearchProps) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    window.location.href = `/search?query=${encodedQuery}`;
  }

  if (pathname === "/" && size === "half") {
    return null;
  }

  // Header/Half size styling
  if (size === "half") {
    return (
      <form onSubmit={handleSubmit} className="relative max-w-md">
        <label htmlFor="search" className="sr-only">
          Search places
        </label>
        <Input
          id="search"
          placeholder="Search places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 py-2 pr-2"
          aria-label="Search for accessible places"
        />
      </form>
    );
  }

  // Full and page size styling (existing)
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
        <div className="relative group mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white dark:bg-black rounded-2xl shadow-xl border-2 border-slate-200 dark:border-slate-400 overflow-hidden">
            <div className="flex items-center">
              <div className="pl-6 pr-1 py-4 hidden sm:block">
                <SearchIcon
                  className="h-5 w-5 text-slate-400 dark:text-slate-500"
                  aria-hidden="true"
                />
              </div>
              <label htmlFor="search" className="sr-only">
                Search places
              </label>

              <Input
                id="search"
                placeholder="Search for businesses, schools, or other places..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="m-2 flex-1 border-0 bg-transparent text-lg placeholder:text-slate-600 dark:placeholder:text-slate-400 dark:text-slate-100 py-4"
                aria-label="Search for accessible places"
              />
              <Button type="submit" variant="secondary" className="mr-2 my-2">
                Search
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
