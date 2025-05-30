import { main as indicatorUpdate } from "@/db/update-indicators";

export async function main() {
  try {
    await indicatorUpdate();
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

main()
  .then(() => {
    console.log("Seeding completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
  });
