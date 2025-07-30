import { Compass, Megaphone, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Hero() {
  const cardData = [
    {
      icon: Compass,
      title: 'Find Accessible Places',
      description:
        "Whether you're looking for wheelchair-accessible seating, accessible transportation, sensory-friendly spaces, contactless ordering, or more, we can help you find what you need!",
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient:
        'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      iconBg: 'bg-blue-500',
    },
    {
      icon: Star,
      title: 'Rate Businesses',
      description:
        'Rate your accessibility experiences and help the disabled community make informed decisions about where to go. The more places you rate, the more that Accuguide helps everyone!',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient:
        'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
      iconBg: 'bg-purple-500',
    },
    {
      icon: Megaphone,
      title: 'Take Action',
      description:
        'Advocate for better accessibility and inclusion in your area. Start initiatives, support local efforts, and empower change through community-driven solutions!',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient:
        'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
      iconBg: 'bg-emerald-500',
    },
  ]

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            How Accuguide Works
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Join our community-driven platform to discover, rate, and advocate
            for accessible spaces everywhere.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {cardData.map(
            ({
              icon: Icon,
              title,
              description,
              gradient,
              bgGradient,
              iconBg,
            }) => (
              <Card
                key={title}
                className="group relative transform overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                ></div>
                <CardHeader className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <div
                      className={`rounded-2xl p-4 ${iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
