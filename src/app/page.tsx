import Hero from "@/components/hero";
import LandingTitle from "@/components/landing-title";
import Search from "@/components/search";

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
