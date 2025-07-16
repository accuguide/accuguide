import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";
import { randomUUID } from "crypto";

const BUCKET = "profile-images";

export async function uploadProfilePicture(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `${randomUUID()}-${file.name}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    );
    return key;
  } catch (error) {
    throw error;
  }
}

export async function getSignedUrlForKey(
  key: string,
  expiresInSeconds = 3600,
): Promise<string> {
  try {
    const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
    const { GetObjectCommand } = await import("@aws-sdk/client-s3");

    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });
    return url;
  } catch (error) {
    console.error("[getSignedUrlForKey] Error generating signed URL:", error);
    throw error;
  }
}
