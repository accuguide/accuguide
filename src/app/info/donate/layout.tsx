import LayoutDisplay from '@/components/layout/layout-display'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Donate to support Accuguide and help us improve accessibility for everyone.',
  alternates: {
    canonical: '/donate/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay
      title="Donate"
      subtitle="Please consider donating to Accuguide to ensure that we can continue to keep Accuguide running for free and be able to pay for the services required to run this platform."
    >
      {children}
    </LayoutDisplay>
  )
}
