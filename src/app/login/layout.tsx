import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to Accuguide to write reviews and save your favorites",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay title="Log In">{children}</LayoutDisplay>;
}
