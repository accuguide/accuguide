import { Button } from "@/components/ui/button";
import { main } from "@/db/update-indicators";

async function updateIndicators() {
  "use server";
  await main();
}

export default function Page() {
  return (
    <div>
      <h1 className="mb-2">Admin Dashboard</h1>
      <form action={updateIndicators}>
        <Button type="submit">Update Indicators</Button>
      </form>
    </div>
  );
}
