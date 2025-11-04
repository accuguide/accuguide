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
        <section className="my-12 md:my-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="rounded-2xl bg-slate-400/5 p-8 md:p-16 lg:py-32 dark:bg-white/5">
                <LandingTitle />

                {/* Search Section */}
                <div className="mt-8 md:mt-12">
                  <Search size="full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <Hero />
        </section>

        {/* Stats Section */}
        <div className="my-16 md:my-32">
          <Stats />
        </div>
      </div>
    </main>
  )
}
