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
    },
    {
      icon: Star,
      title: 'Rate Businesses',
      description:
        'Rate your accessibility experiences and help the disabled community make informed decisions about where to go. The more places you rate, the more that Accuguide helps everyone!',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient:
        'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
    },
    {
      icon: Megaphone,
      title: 'Take Action',
      description:
        'Advocate for better accessibility and inclusion in your area. Start initiatives, support local efforts, and empower change through community-driven solutions!',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient:
        'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    },
  ]

  return (
    <section className="w-full">
      <div className="max-w-6xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-4xl dark:text-slate-100">
            How Accuguide Works
          </h2>
          <p className="mx-auto mt-2 mb-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Join our community-driven platform to discover, rate, and advocate
            for accessible spaces everywhere.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cardData.map(
            ({ icon: Icon, title, description, gradient, bgGradient }) => (
              <Card
                key={title}
                className="group relative transform overflow-hidden border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-800 dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50`}
                ></div>
                <CardHeader className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`rounded-xl bg-gradient-to-r p-3 ${gradient} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 transition-colors group-hover:text-slate-700 dark:text-slate-100 dark:group-hover:text-slate-300">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative mt-[-1rem]">
                  <p className="leading-relaxed text-slate-600 dark:text-slate-300">
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
