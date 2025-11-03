import dynamic from 'next/dynamic'
import LandingTitle from '@/components/landing/landing-title'

// Use dynamic imports for components that can be lazy loaded
const Hero = dynamic(() => import('@/components/landing/hero'), {
  loading: () => (
    <div className="h-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
  ),
})

const Stats = dynamic(() => import('@/components/landing/stats'), {
  loading: () => (
    <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
  ),
})

const Search = dynamic(() => import('@/components/search/search'), {
  loading: () => (
    <div className="h-16 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
  ),
})

export default async function Page() {
  return (
    <main>
      <div className="container mx-auto px-0 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          <div className="w-full max-w-6xl space-y-8 my-24 md:my-32">
            <LandingTitle />

            {/* Search Section */}
            <div className="mx-auto max-w-4xl">
              <Search size="full" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <Hero />
        </section>

        {/* Stats Section */}
        <div className="my-24 md:my-32">
          <Stats />
        </div>
      </div>
    </main>
  )
}
