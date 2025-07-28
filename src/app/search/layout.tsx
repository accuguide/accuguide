import LayoutDisplay from '@/components/layout/layout-display'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for accessible places and services on Accuguide',
  alternates: {
    canonical: '/search/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay
      title="Search"
      subtitle="Choose a place to find accessibility info or rate its accessibility"
    >
      {children}
    </LayoutDisplay>
  )
}
