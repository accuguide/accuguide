'use client'

import { APIProvider } from '@vis.gl/react-google-maps'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { LocationProvider } from '@/contexts/location-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider
      apiKey={'AIzaSyDdm_onqTt2Ud_6-MLeiHEp2J8nq1eNNoU'}
      onLoad={() => console.log('Maps API has loaded.')}
    >
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
