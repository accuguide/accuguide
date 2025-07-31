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
        'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      iconBg: 'bg-blue-500',
    },
    {
      icon: Star,
      title: 'Rate Businesses',
      description:
        'Rate your accessibility experiences and help the disabled community make informed decisions about where to go. The more places you rate, the more that Accuguide helps everyone!',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient:
        'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
      iconBg: 'bg-purple-500',
    },
    {
      icon: Megaphone,
      title: 'Take Action',
      description:
        'Advocate for better accessibility and inclusion in your area. Start initiatives, support local efforts, and empower change through community-driven solutions!',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient:
        'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
      iconBg: 'bg-emerald-500',
    },
  ]

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
            How Accuguide Works
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            Join our community-driven platform to discover, rate, and advocate
            for accessible spaces everywhere.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {cardData.map(
            ({ icon: Icon, title, description, bgGradient, iconBg }, index) => (
              <Card
                key={title}
                className="group relative transform overflow-hidden border-0 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl dark:bg-slate-800 dark:shadow-slate-900/50"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Background gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-60`}
                />

                <CardHeader className="relative mb-[-16px]">
                  <div className="mb-6 flex justify-center">
                    <div
                      className={`rounded-2xl p-4 shadow-lg transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
                    >
                      <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl font-bold text-slate-900 transition-colors group-hover:text-slate-700 dark:text-slate-100 dark:group-hover:text-slate-300 sm:text-2xl">
                    {title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-center leading-relaxed text-slate-600 dark:text-slate-300">
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
