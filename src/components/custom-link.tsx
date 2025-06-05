import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CustomLink({
  children,
  href,
  underline = false,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  underline?: boolean;
}>) {
  return (
    <Link href={href} className={cn(underline ? "underline" : "")}>
      {children}
    </Link>
  );
}
