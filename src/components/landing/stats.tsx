import { MapPin, Shield, Star } from 'lucide-react'
import CountUpNumber from './count-up-number'

export default async function Stats() {
  // Using fake numbers for demo purposes
  const places = 12847
  const indicators = 45
  const reviews = 3291

  const stats = [
    {
      value: places,
      label: 'Places Catalogued',
      icon: MapPin,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      value: reviews,
      label: 'Reviews Written',
      icon: Star,
      color: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-950/30',
    },
    {
      value: indicators,
      label: 'Accessibility Indicators',
      icon: Shield,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
  ]

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Making a Real Impact
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Join thousands of users who are building a more accessible world
            together
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${stat.bgColor} border border-slate-200 dark:border-slate-700`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className={`h-16 w-16 flex items-center justify-center rounded-full ${stat.color} bg-white dark:bg-slate-800 shadow-lg`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <p
                      className={`text-4xl md:text-5xl font-bold ${stat.color}`}
                    >
                      <CountUpNumber value={stat.value} />
                    </p>
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
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
