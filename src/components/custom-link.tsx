import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CustomLink({
  children,
  href,
  underline = false,
  newTab = false,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  underline?: boolean;
  newTab?: boolean;
}>) {
  return (
    <Link
      href={href}
      className={cn(underline ? "underline" : "")}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
