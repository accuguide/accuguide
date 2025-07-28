import Link from 'next/link'

export default function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-sm text-slate-600 dark:text-slate-300 hover:underline hover:opacity-75 transition-opacity duration-50"
    >
      {children}
    </Link>
  )
}
