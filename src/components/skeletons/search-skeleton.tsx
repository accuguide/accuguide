import MapSkeleton from '@/components/skeletons/map-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function SearchSkeleton() {
  return (
    <div>
      {/* Compact map skeleton for small screens */}
      <div className="mt-6 lg:hidden">
        <MapSkeleton compact />
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="mt-8 mb-4">All Results</h2>
            <div className="-mx-px grid grid-cols-1 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="m-2 rounded-lg border-2 border-t border-r border-b border-l p-4 sm:p-6"
                >
                  <div className="flex flex-col items-center space-y-3 pt-6 pb-4">
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

        {/* Sidebar map skeleton for large screens */}
        <div className="sticky top-4 hidden h-fit lg:block">
          <MapSkeleton />
        </div>
      </div>
    </div>
  )
}
