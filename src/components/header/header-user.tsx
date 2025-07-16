import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSignedUrlForKey } from "@/lib/s3/functions";
import { getServerUser } from "@/lib/session";
import { Button } from "@/components/ui/button";

export default async function HeaderUser() {
  const user = await getServerUser();
  if (!user) {
    return (
      <Link href="/sign-in/">
        <Button>Sign In</Button>
      </Link>
    );
  }
  const imageUrl = user?.image
    ? await getSignedUrlForKey(user.image)
    : undefined;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={imageUrl} alt="your profile image" />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 mr-8 border-2">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link
          href="/profile/"
          className="text-neutral-900 dark:text-neutral-100"
        >
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link
          href="/sign-out/"
          className="text-neutral-900 dark:text-neutral-100"
        >
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </Link>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
