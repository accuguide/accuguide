import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getSignedUrlForKey } from '@/lib/s3/functions'
import { getServerUser } from '@/lib/session'

export default async function HeaderUser() {
  const user = await getServerUser()
  if (!user) {
    return (
      <Link href="/sign-in/">
        <Button>Sign In</Button>
      </Link>
    )
  }
  const imageUrl = user?.image
    ? await getSignedUrlForKey(user.image)
    : undefined
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer rounded-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1">
          <Avatar>
            <AvatarImage src={imageUrl} alt="your profile image" />
            <AvatarFallback className="font-bold">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-1 mr-12 border-2 font-semibold">
        <DropdownMenuLabel className="font-bold">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/favorites/" className="text-slate-600 dark:text-slate-300">
          <DropdownMenuItem>Favorites</DropdownMenuItem>
        </Link>
        <Link href="/settings/" className="text-slate-600 dark:text-slate-300">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        {user?.role === 'admin' && (
          <Link href="/admin/" className="text-slate-600 dark:text-slate-300">
            <DropdownMenuItem>Admin</DropdownMenuItem>
          </Link>
        )}
        <Link href="/sign-out/" className="text-slate-600 dark:text-slate-300">
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
