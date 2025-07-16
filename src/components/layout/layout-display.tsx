import { cn } from "@/lib/utils";
import Title from "./title";

export default function LayoutDisplay({
  title,
  children,
  className,
}: Readonly<{
  title?: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn(className)}>
      {title && <Title>{title}</Title>}
      {children}
    </div>
  );
}
