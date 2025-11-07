import Image from 'next/image'
import Link from 'next/link'
import FooterLink from './footer-link'

const navigation = {
  info: [
    { name: 'About', href: '/info/about/' },
    { name: 'Donate', href: '/info/donate/' },
    { name: 'Blog', href: 'https://blog.accuguide.org' },
    { name: 'Volunteer', href: '/info/volunteer/' },
  ],
  help: [
    { name: 'FAQ', href: '/help/faq/' },
    { name: 'Resources', href: '/help/resources/' },
    { name: 'Feedback', href: '/help/feedback/' },
    { name: 'Report A Bug', href: '/contact/' },
  ],
  contact: [
    { name: 'Email', href: '/contact/' },
    { name: 'Instagram', href: 'https://instagram.com/accuguideorg' },
    { name: 'Bluesky', href: 'https://bsky.app/profile/accuguide.org' },
    { name: 'GitHub', href: 'https://github.com/accuguide' },
  ],
  legal: [
    { name: 'Privacy', href: '/legal/privacy/' },
    { name: 'Terms', href: '/legal/terms/' },
    { name: 'Disclaimers', href: '/legal/disclaimers/' },
    { name: 'Accessibility', href: '/legal/accessibility/' },
  ],
  social: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/accuguideorg',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="#90a1b9" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Bluesky',
      href: 'https://bsky.app/profile/accuguide.org',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="#90a1b9" viewBox="0 0 24 24" {...props}>
          <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
        </svg>
      ),
    },
  ],
}

interface FooterLinkListProps {
  title: string
  items: Array<{ name: string; href: string }>
  openInNewTab?: boolean
}

function FooterLinkList({ title, items, openInNewTab }: FooterLinkListProps) {
  return (
    <div>
      <h3 className="footer-heading text-sm font-bold">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.name}>
            <FooterLink
              href={item.href}
              target={
                openInNewTab && item.name !== 'Get in Touch'
                  ? '_blank'
                  : undefined
              }
            >
              {item.name}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="w-full">
      <hr className="-mx-4 md:-mx-12 border" />

      <div className="container mx-auto max-w-7xl pt-12 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="Disability pride logo"
                width={64}
                height={64}
                className="h-12 w-12 rounded-lg"
              />
            </Link>
            <p className="text-sm font-bold">
              Discover accessibility with Accuguide
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="blank"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <span className="sr-only font-bold">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterLinkList title="Info" items={navigation.info} />
              <div className="mt-10 md:mt-0">
                <FooterLinkList title="Help" items={navigation.help} />
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterLinkList
                title="Contact"
                items={navigation.contact}
                openInNewTab
              />
              <div className="mt-10 md:mt-0">
                <FooterLinkList title="Legal" items={navigation.legal} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t-2 pt-8">
          <p className="text-xs secondary-text font-semibold">
            &copy; 2025 Accuguide. All rights reserved.
            <br />
            This site is powered by{' '}
            <Link
              href="https://netlify.com"
              className="hover:underline hover:opacity-75"
            >
              Netlify
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
