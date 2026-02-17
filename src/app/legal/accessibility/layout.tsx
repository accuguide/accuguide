import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: "Accuguide's Accessibility Statement",
  alternates: {
    canonical: '/legal/accessibility/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay
      title="Accessibility Statement"
      subtitle="This accessibility statement describes Accuguide's commitment to accessibility"
    >
      {children}
    </LayoutDisplay>
  )
}
