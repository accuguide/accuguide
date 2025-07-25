import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "Accuguide administrator dashboard for managing content and settings.",
  alternates: {
    canonical: "/admin/",
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutDisplay title="Administrator Dashboard">{children}</LayoutDisplay>
  );
}
