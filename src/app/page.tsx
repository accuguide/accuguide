import Hero from "@/components/hero";
import Search from "@/components/search";
import Title from "@/components/title";

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <Title>Welcome to Accuguide</Title>
      <Search size="full" />
      <Hero />
    </div>
  );
}
