import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "User account settings in Accuguide",
  alternates: {
    canonical: "/settings/account/",
  },
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>;
}
