import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

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
    <LayoutDisplay title="Privacy Policy" className="md:max-w-[75%]">
      {children}
    </LayoutDisplay>
  )
}
