import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'Volunteer Opportunities',
  description: 'Apply to become a volunteer with Accuguide.',
  alternates: {
    canonical: '/info/volunteer/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay
      title="Volunteer Opportunities"
      subtitle="Apply to become a volunteer with Accuguide. These positions are remote and open to applicants worldwide. While no experience is required, it is definitely a plus! All volunteer positions are low-commitment and flexible to fit your schedule."
    >
      {children}
    </LayoutDisplay>
  )
}
