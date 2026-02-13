'use client'

import { APIProvider } from '@vis.gl/react-google-maps'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { LocationProvider } from '@/contexts/location-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LocationProvider>
          <Toaster position="top-center" richColors />
          {children}
        </LocationProvider>
      </ThemeProvider>
    </APIProvider>
  )
}
