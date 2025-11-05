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
      id: 1,
      name: 'Places Catalogued',
      value: places,
      icon: MapPin,
      color: 'text-blue-600',
    },
    {
      id: 2,
      name: 'Reviews Written',
      value: reviews,
      icon: Star,
      color: 'text-pink-500',
    },
    {
      id: 3,
      name: 'Accessibility Indicators',
      value: indicators,
      icon: Shield,
      color: 'text-green-600',
    },
  ]

  return (
    <div>
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-pretty">
              Making Accessibility Data Available
            </h2>
            <p className="mt-6 text-lg font-bold">
              Join thousands of users building a more accessible world
            </p>
          </div>
          <dl className="mt-8 md:mt-12 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={stat.id}
                  className="flex flex-col bg-slate-400/5 p-8 dark:bg-slate-800"
                >
                  <dt className="text-sm/6 font-semibold">
                    <IconComponent
                      className={`mx-auto mb-4 h-10 w-10 ${stat.color}`}
                    />
                  </dt>
                  <dd
                    className={`text-3xl font-semibold tracking-tight ${stat.color}`}
                  >
                    <CountUpNumber value={stat.value} />
                    <p className="mt-4 font-bold text-lg">{stat.name}</p>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </div>
  )
}
