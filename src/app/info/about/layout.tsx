import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Accuguide and its mission',
  alternates: {
    canonical: '/about/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>
}
