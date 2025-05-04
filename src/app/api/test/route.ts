import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/s3";

export async function GET() {
  try {
    const bucketName = "pfps";
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const response = await s3Client.send(command);

    return new Response(JSON.stringify(response.Contents || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data from bucket:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
}
