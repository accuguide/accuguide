import LayoutDisplay from '@/components/layout/layout-display'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password in Accuguide',
  alternates: {
    canonical: '/sign-in/password/reset/',
  },
}

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutDisplay>{children}</LayoutDisplay>
}
