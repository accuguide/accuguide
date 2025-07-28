import LayoutDisplay from '@/components/layout/layout-display'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Out',
  description: 'Sign out of Accuguide',
  alternates: {
    canonical: '/sign-out/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutDisplay title="Sign Out">{children}</LayoutDisplay>
}
