import { Skeleton } from '@/components/ui/skeleton'

export default function SearchSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 mt-8">Catalogued Results</h2>
        <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border-r border-b border-l border-t border-2 p-4 sm:p-6 m-2"
            >
              <div className="pt-6 pb-4 flex flex-col items-center space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-4 mt-8">All Results</h2>
        <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border-r border-b border-l border-t border-2 p-4 sm:p-6 m-2"
            >
              <div className="pt-6 pb-4 flex flex-col items-center space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
