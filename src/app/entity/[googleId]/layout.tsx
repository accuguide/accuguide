import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ googleId: string }>;
}): Promise<Metadata> {
  const { googleId } = await params;

  // Fetch entity data from the API
  const response = await fetch(
    `${process.env.URL}/api/entity/?googleId=${googleId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch entity data");
  }
  const entity = await response.json();

  // Set the title dynamically based on the entity name
  return {
    title: entity[0]?.name || "Entity",
    description: `Business and accessibility information about ${entity[0]?.name || "[entity]"} - a ${entity[0]?.displayType || "[displayType]"} in ${entity[0]?.city || "[city]"}, on Accuguide`,

    alternates: {
      canonical: `/entity/${entity[0].id}/`,
    },
  };
}

export default async function SearchLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ googleId: string }>;
}>) {
  const { googleId } = await params;

  // Fetch entity data from the API
  const response = await fetch(
    `${process.env.URL}/api/entity/?googleId=${googleId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch entity data");
  }
  const entity = await response.json();

  return (
    <LayoutDisplay title={entity[0].name} className="md:max-w-[50%]">
      {children}
    </LayoutDisplay>
  );
}
