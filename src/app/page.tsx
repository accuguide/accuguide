import Hero from "@/components/hero";
import Location from "@/components/location";
import Search from "@/components/search";
import Title from "@/components/title";

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <Title>Discover accessibility with Accuguide</Title>
      <Search size="full" />
      <Hero />
      <Location />
    </div>
  );
}
