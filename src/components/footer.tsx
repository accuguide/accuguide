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
            width={54}
            height={54}
            className="mr-4 w-[54px] h-[54px] mt-2 rounded-lg"
          />
          <div>
            <h3 className="text-lg mb-1">Accuguide</h3>
            <p className="mb-0">Discover</p>
            <p>Accessibility</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4 md:text-base md:gap-12 lg:gap-32">
          <div>
            <h3 className="mb-1">Info</h3>

            <CustomLink href="/about/">About</CustomLink>
            <CustomLink href="/sitemap.xml">Sitemap</CustomLink>
          </div>
          <div>
            <h3 className="mb-1">Help</h3>
            <CustomLink href="/help/faq/">FAQ</CustomLink>
            <CustomLink href="/help/resources/">Resources</CustomLink>
          </div>
          <div>
            <h3 className="mb-1">Contact</h3>
            <CustomLink href="mailto:support@accuguide.org">Email</CustomLink>
            <CustomLink href="https://github.com/accuguide/accuguide">
              Github
            </CustomLink>
          </div>
          <div>
            <h3 className="mb-1">Legal</h3>
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
