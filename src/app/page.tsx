import dynamic from 'next/dynamic'
import LandingTitle from '@/components/landing/landing-title'

import Hero from '@/components/landing/hero'
import Stats from '@/components/landing/stats'
import Search from '@/components/search/search'

export default async function Page() {
  return (
    <div className="flex flex-col items-center space-y-16">
      <div className="w-full max-w-6xl px-4">
        <LandingTitle />
      </div>
      
      <div className="w-full max-w-4xl px-4">
        <Search size="full" />
      </div>
      
      <div className="w-full max-w-6xl px-4">
        <Stats />
      </div>
      
      <div className="w-full max-w-6xl px-4">
        <Hero />
      </div>
    </div>
  )
}
