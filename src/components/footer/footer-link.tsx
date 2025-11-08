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
      className="py-2 font-semibold text-slate-500 text-sm transition-opacity duration-50 hover:underline hover:opacity-75 dark:text-slate-400"
    >
      {children}
    </Link>
  )
}
