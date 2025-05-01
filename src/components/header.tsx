import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Login from "@/components/login";
import { checkAuthDisplay } from "@/lib/auth";
import Search from "@/components/search";
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
async function AuthDisplay() {
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
            <AvatarImage src={user?.picture} alt="@shadcn" />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-2 mr-8">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

export default async function Header() {
  return (
    <header className="border-b px-8 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold">
        Access Finder
      </Link>
      <div className="flex gap-4">
        <Search size="half" />
        <AuthDisplay />
      </div>
    </header>
  );
}
