'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void
    }
  }
}

export default function Page() {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds()
    }
  }, [])

  return (
    <div>
      <script src="https://tally.so/widgets/embed.js"></script>

      <iframe
        data-tally-src="https://tally.so/embed/me1d0E?alignLeft=1&hideTitle=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="200"
        title="Feedback form"
      ></iframe>
    </div>
  )
}
