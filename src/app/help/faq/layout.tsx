import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Find answers to frequently asked questions about Accuguide",
  alternates: {
    canonical: "/help/faq/",
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutDisplay
      title="Frequently Asked Questions"
      subtitle="Here you can find answers to some of the most common questions about Accuguide. Please reach out to us via email if you have any other questions or need further assistance."
      halfWidth
    >
      {children}
    </LayoutDisplay>
  );
}
