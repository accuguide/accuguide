import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "A list of accessibility and disability resources compiled by Accuguide",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay title="Resources">{children}</LayoutDisplay>;
}
