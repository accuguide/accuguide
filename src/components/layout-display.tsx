import Title from "./title";

export default function LayoutDisplay({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="md:max-w-[50%]">
      <Title>{title}</Title>
      {children}
    </div>
  );
}
