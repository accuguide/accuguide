import Link from 'next/link'

export default function FooterLink({
  href,
  children,
  target,
}: {
  href: string
  children: React.ReactNode
  target?: string
}) {
  return (
    <Link
      href={href}
      target={target}
      className="text-sm font-semibold text-slate-500 dark:text-slate-400 transition-opacity duration-50 hover:underline hover:opacity-75 py-2"
    >
      {children}
    </Link>
  )
}
