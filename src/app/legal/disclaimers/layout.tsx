import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'Disclaimers',
  description:
    "Accuguide's Disclaimers explains Accuguide's limitations and responsibilities",
  alternates: {
    canonical: '/legal/disclaimers/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay
      title="Disclaimers"
      subtitle="This disclaimer outlines the limitations and responsibilities of Accuguide"
    >
      {children}
    </LayoutDisplay>
  )
}
