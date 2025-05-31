import LayoutDisplay from "@/components/layout-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Access Finder's Privacy Policy",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutDisplay title="Privacy Policy" className="md:max-w-[50%]">
      {children}
    </LayoutDisplay>
  );
}
