export default function Title({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <h1>{children}</h1>;
}
