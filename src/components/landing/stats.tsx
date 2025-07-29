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
    },
    {
      value: reviews,
      label: 'Reviews Written',
      icon: Star,
      color: 'text-pink-500',
    },
    {
      value: indicators,
      label: 'Accessibility Indicators',
      icon: Shield,
      color: 'text-green-600',
    },
  ]

  return (
    <section className="pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-2xl p-2 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg md:p-8`}
              >
                <div
                  className={`hidden h-16 w-16 items-center justify-center rounded-full md:inline-flex ${stat.color} mb-6 bg-white shadow-sm`}
                >
                  <IconComponent className="h-8 w-8" />
                </div>

                <div className="flex items-center gap-4 sm:block sm:space-y-2">
                  <p
                    className={`text-3xl font-bold ${stat.color} mt-[-0.15rem] sm:text-4xl`}
                  >
                    <CountUpNumber value={stat.value} />
                  </p>
                  <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </p>
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
