import EntityDisplay from "@/components/entity-display";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EntityDisplay id={id} />;
}
