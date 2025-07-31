import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Unsubscribe from Accuguide emails',
  alternates: {
    canonical: '/unsubscribe/',
  },
}

export default function UnsubscribeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>
}
