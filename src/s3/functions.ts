import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/s3";
import { randomUUID } from "crypto";

const BUCKET = "profile-images";

export async function uploadProfilePicture(file: File): Promise<string> {
  try {
    console.debug("[uploadProfilePicture] Starting upload for file:", file.name);
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
    console.debug("[uploadProfilePicture] Successfully uploaded file with key:", key);
    return key;
  } catch (error) {
    console.error("[uploadProfilePicture] Error uploading file:", error);
    throw error;
  }
}

export async function getSignedUrlForKey(
  key: string,
  expiresInSeconds = 3600,
): Promise<string> {
  try {
    console.debug("[getSignedUrlForKey] Generating signed URL for key:", key);
    const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
    const { GetObjectCommand } = await import("@aws-sdk/client-s3");

    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
    console.debug("[getSignedUrlForKey] Signed URL generated:", url);
    return url;
  } catch (error) {
    console.error("[getSignedUrlForKey] Error generating signed URL:", error);
    throw error;
  }
}