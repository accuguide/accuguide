import Link from "next/link";

export default function FooterLink({
  children,
  href,
}: Readonly<{
  children: React.ReactNode;
  href: string;
}>) {
  return (
    <Link href={href}>
      <p>{children}</p>
    </Link>
  );
}
