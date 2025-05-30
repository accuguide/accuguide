"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfilePicturePreviewProps {
  pictureUrl: string;
}

export function ProfilePicturePreview({
  pictureUrl,
}: ProfilePicturePreviewProps) {
  return (
    <Avatar className="w-24 h-24">
      <AvatarImage src={pictureUrl} alt="your profile image" />
      <AvatarFallback>No image</AvatarFallback>
    </Avatar>
  );
}
