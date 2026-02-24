import { Compass, MapPin, Megaphone, Shield, Star } from 'lucide-react'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import FeatureCard from '@/components/landing/feature-card'
import StatCard from '@/components/landing/stat-card'
import { db } from '@/lib/db'
import { entityTable, indicatorTable, reviewTable } from '@/lib/db/schema'

const Search = dynamic(() => import('@/components/search/search'), {
  loading: () => (
    <div className="h-16 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
  ),
})

const features = [
  {
    name: 'Find Accessible Places',
    description:
      "Whether you're looking for wheelchair-accessible seating, accessible transportation, sensory-friendly spaces, contactless ordering, or more, we can help you find what you need!",
    icon: Compass,
    iconBg: 'bg-blue-500 dark:bg-blue-600',
  },
  {
    name: 'Rate Businesses',
    description:
      'Rate your accessibility experiences and help the disabled community make informed decisions about where to go. The more places you rate, the more that Accuguide helps everyone!',
    icon: Star,
    iconBg: 'bg-purple-500 dark:bg-purple-600',
  },
  {
    name: 'Take Action',
    description:
      'Advocate for better accessibility and inclusion in your area. Start initiatives, support local efforts, and empower change through community-driven solutions!',
    icon: Megaphone,
    iconBg: 'bg-emerald-500 dark:bg-emerald-600',
  },
]

export default async function Page() {
  const results = await Promise.allSettled([
    db.$count(entityTable),
    db.$count(indicatorTable),
    db.$count(reviewTable),
  ])

  const places = results[0].status === 'fulfilled' ? results[0].value || 0 : 0
  const indicators =
    results[1].status === 'fulfilled' ? results[1].value || 0 : 0
  const reviews = results[2].status === 'fulfilled' ? results[2].value || 0 : 0

  if (results.some((r) => r.status === 'rejected')) {
    console.error('[page] One or more count queries failed', results)
  }

  const stats = [
    {
      name: 'Places Catalogued',
      value: places,
      icon: MapPin,
      color: 'text-blue-600',
    },
    {
      name: 'Reviews Written',
      value: reviews,
      icon: Star,
      color: 'text-pink-500',
    },
    {
      name: 'Accessibility Indicators',
      value: indicators,
      icon: Shield,
      color: 'text-green-600',
    },
  ]

  return (
    <main className="container mx-auto">
      {/* Hero Section */}
      <section className="section-spacing-index mx-auto max-w-7xl">
        <div className="pride-bg rounded-lg px-2 py-8 md:p-16 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[42px] text-slate-900 md:text-6xl lg:text-7xl">
              Discover Accessibility
            </h1>
            <p className="mt-4 font-bold text-base text-slate-900 md:mt-8 md:text-2xl">
              Accuguide makes it easy to find accessible places, review
              accessibility features, and share your experiences with the
              community. Get started by searching for a location to explore
              detailed accessibility information or add your own review.
            </p>
          </div>
          <Search size="full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl">
        <h2 className="section-heading">How Accuguide Works</h2>
        <p className="section-subheading">
          Join our community-driven platform to discover, rate, and advocate for
          accessible spaces everywhere.
        </p>
        <dl className="feature-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.name} {...feature} />
          ))}
        </dl>
      </section>

      {/* Stats Section */}
      <section className="section-spacing mx-auto max-w-7xl text-center">
        <h2 className="section-heading">Making Accessibility Data Available</h2>
        <p className="section-subheading">
          Join thousands of users building a more accessible world
        </p>
        <dl className="stats-grid grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col items-center text-center">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.name}
              </dt>
              <dd className="mt-2">
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </dd>
              <dd className="mt-1">
                {stat.icon && <stat.icon className={`h-8 w-8 ${stat.color}`} />}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  )
}
