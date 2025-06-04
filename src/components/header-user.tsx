import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Login from "@/components/login";
import { checkAuthDisplay } from "@/lib/auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/actions";
import { getCurrentSession } from "@/lib/session";
import { getSignedUrlForKey } from "@/s3/functions";

export default async function HeaderUser() {
  const isAuthenticated = await checkAuthDisplay();
  const session = await getCurrentSession();
  const user = session?.user;

  if (!isAuthenticated) {
    return <Login>Login</Login>;
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src={await getSignedUrlForKey(user?.picture || "")}
              alt="your profile image"
            />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-2 mr-8 border-2">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings/">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
