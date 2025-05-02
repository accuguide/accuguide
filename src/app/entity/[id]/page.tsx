import Title from "@/components/title";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Title>Business {id}</Title>;
}
