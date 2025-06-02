import Link from "next/link";
import FooterLink from "./footer-link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t px-8 py-4 lg:px-24">
      <div className="flex justify-between">
        <div className="flex">
          <Image
            src="/images/logo.png"
            alt="Disability pride logo"
            width={54}
            height={54}
            className="mr-4 w-[54px] h-[54px] mt-4 rounded-lg"
          />
          <div>
            <h2>Accuguide</h2>{" "}
            <p>
              Discover accessibility
              <br />
              near you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4 md:text-base md:gap-12 lg:gap-32">
          <div>
            <h2>Info</h2>

            <FooterLink href="/about/">About</FooterLink>
            <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
          </div>
          <div>
            <h2>Help</h2>
            <FooterLink href="/help/faq/">FAQ</FooterLink>
            <FooterLink href="/help/resources/">Resources</FooterLink>
          </div>
          <div>
            <h2>Contact</h2>
            <FooterLink href="mailto:support@accuguide.org">Email</FooterLink>
            <FooterLink href="https://github.com/accuguide/accuguide">
              Github
            </FooterLink>
          </div>
          <div>
            <h2>Legal</h2>
            <FooterLink href="/legal/privacy/">Privacy</FooterLink>
            <FooterLink href="/legal/terms/">Terms</FooterLink>
          </div>
        </div>
      </div>

      <p className="text-xs text-left sm:text-center pt-4 pr-1">
        Copyright 2025 Accuguide
        <br />
        This site is powered by <Link href="https://netlify.com">Netlify</Link>
      </p>
    </footer>
  );
}
