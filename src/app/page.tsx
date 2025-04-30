import Search from "@/components/search";

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="mb-4">Welcome to Access Finder</h1>
      <Search size="full" />
    </div>
  );
}
