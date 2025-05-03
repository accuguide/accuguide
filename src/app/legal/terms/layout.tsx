import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Access Finder's Terms of Service",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay title="Terms of Service">{children}</LayoutDisplay>;
}
