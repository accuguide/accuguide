import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Submit feedback on your experience using Accuguide',
  alternates: {
    canonical: '/help/feedback/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay
      title="Feedback"
      subtitle="Submit feedback on your experience using Accuguide. We appreciate your input and are always looking to improve our service."
      halfWidth
    >
      {children}
    </LayoutDisplay>
  )
}
