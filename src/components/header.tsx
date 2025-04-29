import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Login from "@/components/login";
import { checkAuthDisplay } from "@/lib/auth";
import Search from "./search";

async function AuthDisplay() {
  const isAuthenticated = await checkAuthDisplay();

  if (!isAuthenticated) {
    return <Login>Login</Login>;
  } else {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
  }
}

export default async function Header() {
  return (
    <header className="border-b px-8 py-4 flex items-center justify-between">
      <p className="font-bold">Access Finder</p>
      <div className="flex gap-4">
        <Search size="half" />
        <AuthDisplay />
      </div>
    </header>
  );
}
