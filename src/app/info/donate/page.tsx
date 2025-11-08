// @ts-nocheck
import { Card } from '@/components/ui/card'

/* eslint-disable @next/next/no-sync-scripts */
export default function Page() {
  return (
    <div>
      <div className="flex justify-center">
        <Card className="my-4 p-0 md:p-4">
          <script async src="https://js.stripe.com/v3/buy-button.js"></script>
          {/* @ts-ignore */}
          <div className="scale-100 md:scale-125 origin-center border-2 rounded-lg">
            <stripe-buy-button
              buy-button-id={process.env.NEXT_PUBLIC_STRIPE_BUY_BUTTON_ID}
              publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            ></stripe-buy-button>
          </div>
        </Card>
      </div>
      <div className="mt-12">
        <p className="mb-8 max-w-3xl">
          Looking for a different way to support us? Currently, our only other
          option is sponsoring us on Github, but we will have more options soon!
        </p>
        <div className="flex justify-center">
          <iframe
            src="https://github.com/sponsors/accuguide/card"
            title="Sponsor accuguide"
            height="225"
            width="600"
            className="rounded-lg border-2"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
