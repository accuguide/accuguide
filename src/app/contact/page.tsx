import { Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Page() {
  return (
    <div className="max-w-2xl">
      {/* Contact Options */}
      <dl className="mb-8 space-y-4 text-base">
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Telephone</span>
            <Phone aria-hidden="true" className="h-7 w-6 text-gray-400" />
          </dt>
          <dd>
            <a href="tel:[phone-number]">+1 (408) 658 6493</a>
          </dd>
        </div>
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

      {/* Contact Form */}
      <form action="#" method="POST" className="space-y-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block font-semibold text-sm">
              First name
            </label>
            <div className="mt-2.5">
              <Input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block font-semibold text-sm">
              Last name
            </label>
            <div className="mt-2.5">
              <Input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block font-semibold text-sm">
              Email
            </label>
            <div className="mt-2.5">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block font-semibold text-sm"
            >
              Phone number
            </label>
            <div className="mt-2.5">
              <Input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block font-semibold text-sm">
              Message
            </label>
            <div className="mt-2.5">
              <Textarea id="message" name="message" rows={4} />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="default">
            Send message
          </Button>
        </div>
      </form>
    </div>
  )
}
