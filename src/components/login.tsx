import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Login({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Link href="/login/google/">
      <Button>{children}</Button>
    </Link>
  );
}
