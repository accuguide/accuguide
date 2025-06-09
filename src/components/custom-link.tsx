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
  return newTab ? (
    <a
      href={href}
      className={cn(underline ? "underline" : "")}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={cn(underline ? "underline" : "")}>
      {children}
    </Link>
  );
}
