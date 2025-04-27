export default function Footer() {
  return (
    <footer className="border-t px-8 py-4 lg:px-24">
      <div className="flex justify-between">
        <div>
          <p className="pb-2 font-bold">Access Finder</p>
          <p>Discover accessibility near you</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4 md:text-base md:gap-12 lg:gap-32">
          <div>
            <p className="pb-2 font-bold">About</p>

            <p>About Us</p>
            <p>Sitemap</p>
          </div>
          <div>
            <p className="pb-2 font-bold">Socials</p>
            <p>Instagram</p>
            <p>Bluesky</p>
          </div>
          <div>
            <p className="pb-2 font-bold">Contact</p>
            <p>Email</p>
            <p>Github</p>
          </div>
          <div>
            <p className="pb-2 font-bold">Legal</p>
            <p>Privacy</p>
            <p>Terms</p>
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
