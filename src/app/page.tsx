import dynamic from 'next/dynamic'
import LandingTitle from '@/components/landing/landing-title'

// Use dynamic imports for components that can be lazy loaded
const Hero = dynamic(() => import('@/components/landing/hero'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded"></div>,
})

const Stats = dynamic(() => import('@/components/landing/stats'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-24 rounded"></div>,
})

const Search = dynamic(() => import('@/components/search/search'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-16 rounded"></div>,
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
