import { Skeleton } from '@/components/ui/skeleton'

export default function MapSkeleton({
  compact = false,
}: {
  compact?: boolean
}) {
  return (
    <Skeleton
      className="rounded-lg"
      style={{
        width: compact ? '100%' : '40vw',
        height: compact ? '250px' : '96vh',
      }}
    />
  )
}
