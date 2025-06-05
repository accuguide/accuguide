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
import { getSignedUrlForKey } from "@/s3/functions";
import { getServerUser } from "@/lib/session";

export default async function HeaderUser() {
  const user = await getServerUser();
  if (!user) {
    return (
      <Link
        href="/sign-in/"
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
      >
        Sign In
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
        <Link href="/profile/">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href="/sign-out/">
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </Link>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
