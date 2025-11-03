import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Toaster } from '@/components/ui/sonner'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" richColors />
          <Header />
          <div className="mx-4 my-4 min-h-[80vh] md:mx-12 md:my-8">
            {children}
          </div>
          <Footer />
          <div className="fixed right-4 bottom-4">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
