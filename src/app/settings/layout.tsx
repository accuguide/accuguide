import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "User account settings in Access Finder",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay title="Settings">{children}</LayoutDisplay>;
}
