import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Accuguide and its mission",
  alternates: {
    canonical: "/about/",
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutDisplay title="About Us" halfWidth>
      {children}
    </LayoutDisplay>
  );
}
