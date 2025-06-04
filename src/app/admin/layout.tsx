import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Accuguide's Admin Dashboard for managing reviews, users, and content",
  alternates: {
    canonical: "/admin/",
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay title="Admin Dashboard">{children}</LayoutDisplay>;
}
