export default function Title({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <h1 className="mb-4">{children}</h1>;
}
