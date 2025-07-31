import { MapPin, Shield, Star } from 'lucide-react'
import { db } from '@/lib/db'
import { entityTable, indicatorTable, reviewTable } from '@/lib/db/schema'
import CountUpNumber from './count-up-number'

export default async function Stats() {
  const places = await db.$count(entityTable)
  const indicators = await db.$count(indicatorTable)
  const reviews = await db.$count(reviewTable)
  const stats = [
    {
      value: places,
      label: 'Places Catalogued',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      value: reviews,
      label: 'Reviews Written',
      icon: Star,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    },
    {
      value: indicators,
      label: 'Accessibility Indicators',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
  ]

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Making Accessibility Data Available
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Join thousands of users building a more accessible world
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-slate-800 dark:shadow-slate-900/50"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 dark:to-slate-800/50"></div>

                <div className="relative text-center">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${stat.bgColor}`}
                  >
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>

                  <div className="space-y-2">
                    <p
                      className={`text-4xl font-bold ${stat.color} sm:text-5xl`}
                    >
                      <CountUpNumber value={stat.value} />
                    </p>
                    <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export const dynamic = 'force-static'
export const revalidate = 86400
