import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up for an Accuguide account to write reviews and manage your account",
  alternates: {
    canonical: "/sign-up/",
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>;
}
