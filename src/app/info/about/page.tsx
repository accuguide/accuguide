'use client'

const team = [
  {
    name: 'Naya Singhania',
    role: 'Founder',
    imageUrl: '/images/people/nayasinghania.jpg',
  },
]

const sponsors = [
  {
    name: 'Builders & Backers',
    imageUrl: '/images/sponsors/buildersandbackers.jpg',
  },
  {
    name: 'Netlify',
    imageUrl: '/images/sponsors/netlify.png',
  },
]

export default function AboutPage() {
  return (
    <div>
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-20 lg:px-8">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                    Making the world more accessible
                  </h1>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none dark:text-gray-400">
                    Accuguide is a web application created to help people with
                    disabilities find and rate places based on various
                    accessibility features. Our platform empowers users to make
                    informed decisions about where to go by providing detailed
                    accessibility information and real community experiences.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-40 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                    <div className="relative">
                      <img
                        alt="Accessibility feature example"
                        src="/images/about/guide.avif"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-40 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt="Community rating accessibility"
                        src="/images/about/parking.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt="Accessible entrance"
                        src="/images/about/braille.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                  </div>
                  <div className="w-40 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt="Wheelchair accessibility"
                        src="/images/about/sensory.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt="Accessible facilities"
                        src="/images/about/flower.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Our mission
            </h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl/8 text-gray-600 dark:text-gray-300">
                  Accuguide is a platform that allows users to search for places
                  and services based on their accessibility needs. Users can
                  view a variety of accessibility indicators to make informed
                  decisions about where to go.
                </p>
                <p className="mt-10 max-w-xl text-base/7 text-gray-700 dark:text-gray-400">
                  Our community-driven approach enables users to rate their
                  accessibility experiences at locations, helping others
                  understand what places are accessible and what places to
                  avoid. By sharing real experiences, we're building a
                  comprehensive database of accessibility information that
                  benefits everyone in the disability community.
                </p>
                <p className="mt-6 max-w-xl text-base/7 text-gray-700 dark:text-gray-400">
                  We believe that accessibility information should be easily
                  available to everyone who needs it. Through Accuguide, we're
                  working to create a more inclusive world where people with
                  disabilities can confidently navigate their communities and
                  discover new places.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Our team
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
              Accuguide is currently developed and maintained by a dedicated
              team passionate about creating accessible solutions, along with
              various open-source contributors who help improve the platform. As
              Accuguide grows, we hope to add more people to our team!
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            {team.map((person) => (
              <li key={person.name}>
                <img
                  alt=""
                  src={person.imageUrl}
                  className="mx-auto size-24 rounded-lg outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                />
                <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                  {person.name}
                </h3>
                <p className="text-sm/6 text-gray-600 dark:text-gray-400">
                  {person.role}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sponsors section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Our sponsors
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
              We're grateful for the support of our sponsors who help make
              Accuguide possible.
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            {sponsors.map((sponsor) => (
              <li key={sponsor.name}>
                <img
                  alt=""
                  src={sponsor.imageUrl}
                  className="mx-auto size-24 rounded-lg outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                />
                <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                  {sponsor.name}
                </h3>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 pb-24 sm:mt-40 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Get in touch
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
              We would love to hear from you! Whether you have questions,
              comments, or feedback, feel free to reach out to us at{' '}
              <a
                href="mailto:support@accuguide.org"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                support@accuguide.org
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
