import { db } from '@/lib/db'
import { FaqTable } from '@/lib/db/schema'

export default async function FAQPage() {
  const faqs = await db.select().from(FaqTable)
  return (
    <div>
      <div className="max-w-7xl">
        <dl className="divide-y-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8"
            >
              <dt className="text-base font-semibold lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base secondary-text mt-0">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
