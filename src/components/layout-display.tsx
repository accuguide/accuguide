import Title from "./title";

export default function LayoutDisplay({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <>
      <Title>{title}</Title>
      {children}
    </>
  );
}
