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
        <button className="cursor-pointer rounded-lg hover:opacity-80 focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 focus:outline-none">
          <Avatar>
            <AvatarImage src={imageUrl} alt="your profile image" />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 mr-8 border-2">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link
          href="/settings/profile/"
          className="text-slate-900 dark:text-slate-100"
        >
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link
          href="/settings/account/"
          className="text-slate-900 dark:text-slate-100"
        >
          <DropdownMenuItem>Account</DropdownMenuItem>
        </Link>
        <Link href="/sign-out/" className="text-slate-900 dark:text-slate-100">
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </Link>{' '}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
