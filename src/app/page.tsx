import Search from "@/components/search";

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1>Welcome to Access Finder</h1>
      <br />
      <Search size="full" />
    </div>
  );
}
