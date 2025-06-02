import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Find answers to frequently asked questions about Accuguide",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutDisplay
      title="Frequently Asked Questions"
      className="md:max-w-[50%]"
    >
      {children}
    </LayoutDisplay>
  );
}
