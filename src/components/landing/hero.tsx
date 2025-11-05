import { Compass, Megaphone, Star } from 'lucide-react'

const features = [
  {
    name: 'Find Accessible Places',
    description:
      "Whether you're looking for wheelchair-accessible seating, accessible transportation, sensory-friendly spaces, contactless ordering, or more, we can help you find what you need!",
    // href: '#',
    icon: Compass,
    iconBg: 'bg-blue-500 dark:bg-blue-600',
  },
  {
    name: 'Rate Businesses',
    description:
      'Rate your accessibility experiences and help the disabled community make informed decisions about where to go. The more places you rate, the more that Accuguide helps everyone!',
    // href: '#',
    icon: Star,
    iconBg: 'bg-purple-500 dark:bg-purple-600',
  },
  {
    name: 'Take Action',
    description:
      'Advocate for better accessibility and inclusion in your area. Start initiatives, support local efforts, and empower change through community-driven solutions!',
    // href: '#',
    icon: Megaphone,
    iconBg: 'bg-emerald-500 dark:bg-emerald-600',
  },
]

export default function Hero() {
  return (
    <div>
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-pretty">
            How Accuguide Works
          </h2>
          <p className="mt-6 text-lg font-bold">
            Join our community-driven platform to discover, rate, and advocate
            for accessible spaces everywhere.
          </p>
        </div>
        <div className="mx-auto mt-8 md:mt-12 max-w-2xl sm:mt-12 lg:mt-12 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-lg font-bold">
                  <div
                    className={`mb-2 md:mb-6 flex size-10 items-center justify-center rounded-lg font-bold ${feature.iconBg}`}
                  >
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base">
                  <p className="flex-auto font-semibold">
                    {feature.description}
                  </p>
                  {/* <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm/6 font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p> */}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
