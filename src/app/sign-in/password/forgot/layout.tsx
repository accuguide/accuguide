import LayoutDisplay from "@/components/layout/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Send a forgot password email in Accuguide",
  alternates: {
    canonical: "/sign-in/password/forgot/",
  },
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>;
}
