import dynamic from 'next/dynamic'
import LandingTitle from '@/components/landing/landing-title'

// Use dynamic imports for components that can be lazy loaded
const Hero = dynamic(() => import('@/components/landing/hero'), {
  loading: () => <div className="h-32 animate-pulse rounded bg-gray-200"></div>,
})

const Stats = dynamic(() => import('@/components/landing/stats'), {
  loading: () => <div className="h-24 animate-pulse rounded bg-gray-200"></div>,
})

const Search = dynamic(() => import('@/components/search/search'), {
  loading: () => <div className="h-16 animate-pulse rounded bg-gray-200"></div>,
})

export default async function Page() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <LandingTitle />
        <Search size="full" />
        <Stats />
        <Hero />
      </div>
    </div>
  )
}
