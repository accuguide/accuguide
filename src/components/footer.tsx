import FooterLink from "./footer-link";

export default function Footer() {
  return (
    <footer className="border-t px-8 py-4 lg:px-24">
      <div className="flex justify-between">
        <div>
          <h2>Access Finder</h2>{" "}
          <p>
            Discover accessibility
            <br />
            near you
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4 md:text-base md:gap-12 lg:gap-32">
          <div>
            <h2>Info</h2>

            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </div>
          <div>
            <h2 className="pb-2 font-bold">Socials</h2>
            <p>Coming</p>
            <p>Soon</p>
          </div>
          <div>
            <h2>Contact</h2>
            <FooterLink href="mailto:naya.singhania@gmail.com">
              Email
            </FooterLink>
            <FooterLink href="https://github.com/accessfinder/accessfinder">
              Github
            </FooterLink>
          </div>
          <div>
            <h2>Legal</h2>
            <FooterLink href="/legal/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </div>
        </div>
      </div>

      <p className="text-xs text-left sm:text-center pt-4 pr-1">
        Copyright 2025 Access Finder
        <br />
        This site is powered by Netlify
      </p>
    </footer>
  );
}
