import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  // Fetch entity data from the API
  const response = await fetch(`http://localhost:3000/api/entity?id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch entity data");
  }
  const entity = await response.json();

  // Set the title dynamically based on the entity name
  return {
    title: entity[0]?.name || "Entity",
    description: `Information about ${entity[0]?.name || "[entity]"} on Access Finder`,
  };
}

export default async function SearchLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const { id } = await params;

  // Fetch entity data from the API
  const response = await fetch(`http://localhost:3000/api/entity?id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch entity data");
  }
  const entity = await response.json();

  return <LayoutDisplay title={entity[0].name}>{children}</LayoutDisplay>;
}
