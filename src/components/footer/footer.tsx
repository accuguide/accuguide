import Image from 'next/image'
import Link from 'next/link'
import FooterLink from './footer-link'

export default function Footer() {
  return (
    <footer className="border-t-2 px-4 py-4 lg:px-12">
      <div className="flex justify-between">
        <div className="flex">
          <Image
            src="/images/logo.png"
            alt="Disability pride logo"
            width={64}
            height={64}
            className="mt-2 mr-2 hidden h-[54px] w-[54px] rounded-lg md:mr-4 md:block md:h-[64px] md:w-[64px]"
          />
          <FooterLink href="/">
            <div>
              <p className="footer-heading text-base md:text-lg">Accuguide</p>
              <p className="text-sm font-semibold md:text-base">Discover</p>
              <p className="text-sm font-semibold md:text-base">
                Accessibility
              </p>
            </div>
          </FooterLink>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-12 md:text-base lg:gap-32">
          <div>
            <p className="footer-heading">Info</p>

            <FooterLink href="/info/about/">About</FooterLink>
            <br />
            <FooterLink href="/info/donate/">Donate</FooterLink>
            <br />
            <FooterLink href="https://blog.accuguide.org">Blog</FooterLink>
          </div>
          <div>
            <p className="footer-heading">Help</p>
            <FooterLink href="/help/faq/">FAQ</FooterLink>
            <br />

            <FooterLink href="/help/resources/">Resources</FooterLink>
            <br />
            <FooterLink href="https://forms.gle/KvF2MpNiqq4frrtm8">
              Feedback
            </FooterLink>
          </div>
          <div>
            <p className="footer-heading">Contact</p>
            <FooterLink href="mailto:support@accuguide.org">Email</FooterLink>
            <br />

            <FooterLink href="https://instagram.com/accuguideorg">
              Instagram
            </FooterLink>
            <br />

            <FooterLink href="https://bsky.app/profile/accuguide.org">
              Bluesky
            </FooterLink>
          </div>
          <div>
            <p className="footer-heading">Legal</p>
            <FooterLink href="/legal/privacy/">Privacy</FooterLink>
            <br />
            <FooterLink href="/legal/terms/">Terms</FooterLink>
            <br />
            <FooterLink href="/legal/disclaimers/">Disclaimers</FooterLink>
          </div>
        </div>
      </div>

      <p className="mt-[-50px] pt-4 text-left text-[10px] sm:mt-0 sm:text-center sm:text-xs">
        Copyright 2025 Accuguide
        <br />
        This site is powered by{' '}
        <Link
          href="https://netlify.com"
          className="text-[10px] hover:underline hover:opacity-75 sm:text-xs"
        >
          Netlify
        </Link>
      </p>
    </footer>
  )
}
