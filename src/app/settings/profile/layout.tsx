import LayoutDisplay from '@/components/layout/layout-display'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile settings in Accuguide',
  alternates: {
    canonical: '/profile/',
  },
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>
}
