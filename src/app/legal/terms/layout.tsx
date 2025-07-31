import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'Terms',
  description:
    "Accuguide's Terms of Service explain the rules and guidelines for using Accuguide",
  alternates: {
    canonical: '/legal/terms/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay title="Terms of Service" className="md:max-w-[50%]">
      {children}
    </LayoutDisplay>
  )
}
