import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'

export const metadata: Metadata = {
  title: 'Email',
  description: 'Contact Accuguide via email',
  alternates: {
    canonical: '/contact/email/',
  },
}

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LayoutDisplay
      title="Get In Touch"
      subtitle="Have questions, found a bug, or need assistance? We're here to help. Reach out to us through email and we will get back to you soon."
    >
      {children}
    </LayoutDisplay>
  )
}
