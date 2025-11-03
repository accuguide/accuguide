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
          <div className="scale-125 origin-center">
            <stripe-buy-button
              buy-button-id={process.env.NEXT_PUBLIC_STRIPE_BUY_BUTTON_ID}
              publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            ></stripe-buy-button>
          </div>
        </Card>
      </div>
    </div>
  )
}
