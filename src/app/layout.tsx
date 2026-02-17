import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { Providers } from '@/components/layout/providers'
import Splitter from '@/components/splitter'
import { ModeToggle } from '@/components/theme/mode-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Accuguide - Discover accessibility',
    default: 'Accuguide - Discover accessible places and services',
  },
  authors: [{ name: 'Accuguide Team' }],
  metadataBase: new URL('https://accuguide.org/'),
  alternates: {
    canonical: '.',
  },
  description:
    'Accuguide helps you discover accessible places and services near you. Find detailed accessibility information, reviews, and resources to make your daily life easier.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
          />
        )}
        <Providers>
          <Header />
          <Splitter />
          <div className="mx-4 my-4 min-h-[80vh] md:mx-12 md:my-8">
            {children}
          </div>
          <Splitter />
          <Footer />
          <ModeToggle />
        </Providers>
      </body>
    </html>
  )
}
