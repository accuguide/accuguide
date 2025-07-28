import LayoutDisplay from '@/components/layout/layout-display'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    "Accuguide's Privacy Policy explains how Accuguide handles your data",
  alternates: {
    canonical: '/legal/privacy/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay title="Privacy Policy" className="md:max-w-[50%]">
      {children}
    </LayoutDisplay>
  )
}
