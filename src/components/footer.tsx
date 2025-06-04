import Link from "next/link";
import CustomLink from "./custom-link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t-2 px-8 py-4 lg:px-24">
      <div className="flex justify-between">
        <div className="flex">
          <Image
            src="/images/logo.png"
            alt="Disability pride logo"
            width={64}
            height={64}
            className="mr-4 w-[64px] h-[64px] mt-4 rounded-lg"
          />
          <div>
            <h2>Accuguide</h2> <p>Discover accessibility</p>
            <p>near you</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4 md:text-base md:gap-12 lg:gap-32">
          <div>
            <h2>Info</h2>

            <CustomLink href="/about/">About</CustomLink>
            <CustomLink href="/sitemap.xml">Sitemap</CustomLink>
          </div>
          <div>
            <h2>Help</h2>
            <CustomLink href="/help/faq/">FAQ</CustomLink>
            <CustomLink href="/help/resources/">Resources</CustomLink>
          </div>
          <div>
            <h2>Contact</h2>
            <CustomLink href="mailto:support@accuguide.org">Email</CustomLink>
            <CustomLink href="https://github.com/accuguide/accuguide">
              Github
            </CustomLink>
          </div>
          <div>
            <h2>Legal</h2>
            <CustomLink href="/legal/privacy/">Privacy</CustomLink>
            <CustomLink href="/legal/terms/">Terms</CustomLink>
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
