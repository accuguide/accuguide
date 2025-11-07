import { eq, inArray } from 'drizzle-orm'
import Link from 'next/link'
import ReviewDisplay from '@/components/reviews/review-display'
import { db } from '@/lib/db'
import { Entity, reviewIndicatorTable, reviewTable } from '@/lib/db/schema'
import AIOverview from './ai-overview'
import { Button } from './ui/button'

export default async function EntityDisplay({
  googleId,
}: {
  googleId: string
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/entity/?googleId=${googleId}`,
  )
  const rawData = await res.json()
  const data: Entity = rawData[0]

  const reviews = await db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.entityId, data.id))

  const reviewIds = reviews.map((review) => review.id)

  const indicators = reviewIds.length
    ? await db
        .select()
        .from(reviewIndicatorTable)
        .where(inArray(reviewIndicatorTable.reviewId, reviewIds))
    : []
  return (
    <div>
      <div>
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 pb-6 sm:col-span-2 sm:px-0">
            <h2 className="text-2xl mb-4">Overview</h2>
            <dd className="text-sm/6 text-slate-600 sm:mt-2 dark:text-slate-300">
              <AIOverview
                entity={data}
                reviews={reviews}
                indicators={indicators}
              />
            </dd>
          </div>

          {/* Address - Left Side */}
          <div className="border-t border-slate-600 px-4 py-6 sm:col-span-1 sm:px-0 dark:border-slate-400">
            <h2 className="text-2xl mb-4">Address</h2>
            <dd className="mt-1 text-sm/6 text-slate-600 sm:mt-2 dark:text-slate-300">
              {data?.address1}
              <br />
              {data?.address2 && (
                <>
                  {data?.address2}
                  <br />
                </>
              )}
              {data?.city}, {data?.state} {data?.zip}
              <br />
              {data?.country}
              {data?.address1 && data?.city && data?.country && (
                <div className="mt-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${data.address1}${data.address2 ? ' ' + data.address2 : ''}, ${data.city}, ${data.state ? data.state + ' ' : ''}${data.zip ? data.zip + ' ' : ''}${data.country}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="secondary"
                      className="hover:cursor-pointer hover:opacity-60"
                    >
                      Get Directions
                    </Button>
                  </a>
                </div>
              )}
            </dd>
          </div>

          {/* Website - Right Side */}
          <div className="border-t border-slate-600 px-4 py-6 sm:col-span-1 sm:px-0 dark:border-slate-400">
            <h2 className="text-2xl mb-4">Website</h2>
            <dd className="text-sm/6 text-slate-600 sm:mt-2 dark:text-slate-300">
              {data?.url ? (
                <Link
                  href={data.url}
                  className="text-slate-600 underline dark:text-slate-300 hover:opacity-80"
                >
                  {data.url}
                </Link>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">
                  No website available
                </span>
              )}
            </dd>
          </div>

          {/* Hours - Full Width Row */}
          {data?.hours.length > 0 && (
            <div className="border-y border-slate-600 px-4 py-6 sm:col-span-2 sm:px-0 dark:border-slate-400">
              <h2 className="text-2xl mb-4">Hours</h2>
              <dd className="text-sm/6 text-slate-600 sm:mt-2 dark:text-slate-300">
                <ul>
                  {data?.hours?.map((hour: string, index: number) => (
                    <li key={index} className="flex">
                      <span className="font-semibold">
                        {hour.split(': ')[0]}
                      </span>
                      <span className="ml-1">: {hour.split(': ')[1]}</span>
                    </li>
                  ))}
                </ul>
                {data?.timeZone && (
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Timezone:{' '}
                    {data.timeZone.split('_').map((part, idx) => (
                      <span key={idx}>
                        {part}
                        {idx < data.timeZone.split('_').length - 1 ? ' ' : null}
                      </span>
                    ))}
                  </p>
                )}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Reviews Section - After all rows */}
      <div>
        <ReviewDisplay
          entity_id={data.id}
          entity_type={data?.type}
          reviews={reviews}
          indicators={indicators}
          profile={false}
        />
      </div>
    </div>
  )
}
