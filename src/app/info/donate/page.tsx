import { Card } from '@/components/ui/card'

/* eslint-disable @next/next/no-sync-scripts */
export default function Page() {
  return (
    <div>
      <div className="flex">
        <Card className="p-0 md:p-4 my-4">
          <script src="https://donorbox.org/widget.js"></script>
          <iframe
            title="Donate to AccuGuide"
            src="https://donorbox.org/embed/accuguide?"
            name="donorbox"
            seamless={true}
            height="900px"
            width="100%"
            className="rounded-md w-[110%] md:w-[425px]"
            allow="payment"
          ></iframe>
        </Card>
      </div>
      <h2>Current/Past Donors</h2>
      <p>No sponsors yet. Be the first one!</p>
    </div>
  )
}
