import { Card } from '@/components/ui/card'

/* eslint-disable @next/next/no-sync-scripts */
export default function Page() {
  return (
    <div>
      <div className="flex">
        <Card className="my-4 p-0 md:p-4">
          <script src="https://donorbox.org/widget.js"></script>
          <iframe
            title="Donate to AccuGuide"
            src="https://donorbox.org/embed/accuguide?"
            name="donorbox"
            seamless={true}
            height="900px"
            width="100%"
            className="w-[110%] rounded-md md:w-[425px]"
            allow="payment"
          ></iframe>
        </Card>
      </div>
      <h2>Current/Past Donors</h2>
      <p>No sponsors yet. Be the first one!</p>
    </div>
  )
}
