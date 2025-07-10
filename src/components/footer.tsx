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
            className="mr-4 w-[54px] h-[54px] mt-3 rounded-lg"
          />
          <CustomLink href="/">
            <div>
              <h2 className="mb-1 text-base dark:text-white text-black">
                Accuguide
              </h2>
              <p className="mb-0">Discover</p>
              <p>Accessibility</p>
            </div>
          </CustomLink>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:text-base md:gap-12 lg:gap-32">
          <div>
            <h2 className="mb-1 text-base">Info</h2>

            <CustomLink href="/about/">About</CustomLink>
            <br />
            <CustomLink href="/donate/">Donate</CustomLink>
            <br />
            <CustomLink href="/sitemap.xml">Sitemap</CustomLink>
          </div>
          <div>
            <h2 className="mb-1 text-base">Help</h2>
            <CustomLink href="/help/faq/">FAQ</CustomLink>
            <br />

            <CustomLink href="/help/resources/">Resources</CustomLink>
          </div>
          <div>
            <h2 className="mb-1 text-base">Contact</h2>
            <CustomLink href="mailto:support@accuguide.org">Email</CustomLink>
            <br />

            <CustomLink href="https://instagram.com/accuguideorg" newTab>
              Instagram
            </CustomLink>
            <br />

            <CustomLink href="https://bsky.app/profile/accuguide.org" newTab>
              Bluesky
            </CustomLink>
          </div>
          <div>
            <h2 className="mb-1 text-base">Legal</h2>
            <CustomLink href="/legal/privacy/">Privacy</CustomLink>
            <br />

            <CustomLink href="/legal/terms/">Terms</CustomLink>
          </div>
        </div>
      </div>

      <p className="text-xs text-left sm:text-center pt-4 pr-1">
        Copyright 2025 Accuguide
        <br />
        This site is powered by{" "}
        <Link href="https://netlify.com" className="text-xs">
          Netlify
        </Link>
      </p>
    </footer>
  );
}
