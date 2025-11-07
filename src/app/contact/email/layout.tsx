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
      subtitle="Have questions or need assistance? We're here to help. Reach out to us through any of the following channels or use the form to send us a message."
    >
      {children}
    </LayoutDisplay>
  )
}
