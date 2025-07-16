import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Donate to support Accuguide and help us improve accessibility for everyone.",
  alternates: {
    canonical: "/donate/",
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay title="Donate">{children}</LayoutDisplay>;
}
