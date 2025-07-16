import Hero from "@/components/landing/hero";
import LandingTitle from "@/components/landing/landing-title";
import Search from "@/components/search/search";

export default async function Page() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <LandingTitle />
        <Search size="full" />
        <Hero />
      </div>
    </div>
  );
}
