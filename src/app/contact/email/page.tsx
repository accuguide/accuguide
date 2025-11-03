import { Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Page() {
  return (
    <div className="relative isolate">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left side - Contact Information */}
        <div className="relative px-6 py-16 md:py-24 lg:static lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Get in touch
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
              Have questions or need assistance? We&apos;re here to help. Reach
              out to us through any of the following channels or use the form to
              send us a message.
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600 dark:text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a
                    href="tel:[phone-number]"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    +1 (408) 658 6493
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a
                    href="mailto:support@accuguide.org"
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    support@accuguide.org
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <form action="#" method="POST" className="px-6  pt-0 md:pt-20 lg:px-8">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
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
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
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
                  className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
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
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <Textarea id="message" name="message" rows={4} />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" variant="default" size="lg">
                Send message
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
