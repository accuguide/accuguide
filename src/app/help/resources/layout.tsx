import LayoutDisplay from '@/components/layout/layout-display'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'A list of various accessibility and disability resources compiled by Accuguide',
  alternates: {
    canonical: '/help/resources/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutDisplay title="Resources">{children}</LayoutDisplay>
}
