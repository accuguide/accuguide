"use client"

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";

export type SearchProps = {
  size: "half" | "full" | "page";
};

export default function Search({ size }: SearchProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href = `/search?query=${query}`;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        className={cn(size === "half" ? "" : "w-full")}
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
