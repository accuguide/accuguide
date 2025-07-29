import { Skeleton } from '@/components/ui/skeleton'

export default function SearchSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="my-4 mt-2">Results</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-[90%]" />
          ))}
        </div>
      </div>
      <div>
        <h2 className="my-4 mt-2">All Google Results</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-[90%]" />
          ))}
        </div>
      </div>
    </div>
  )
}
