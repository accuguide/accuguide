import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Log In to Accuguide to write reviews and manage your account",
  alternates: {
    canonical: "/sign-in/",
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>;
}
