import EntityDisplay from '@/components/entity-display'

export default async function Page({
  params,
}: {
  params: Promise<{ googleId: string }>
}) {
  const { googleId } = await params
  return <EntityDisplay googleId={googleId} />
}
