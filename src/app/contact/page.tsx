import { Mail } from 'lucide-react'

export default function Page() {
  return (
    <div className="max-w-2xl">
      {/* Contact Options */}
      <dl className="mb-8 text-base">
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Email</span>
            <Mail aria-hidden="true" className="h-7 w-6 text-gray-400" />
          </dt>
          <dd>
            <a href="mailto:support@accuguide.org">support@accuguide.org</a>
          </dd>
        </div>
      </dl>
    </div>
  )
}
