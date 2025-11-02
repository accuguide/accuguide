import { cn } from '@/lib/utils'
import Title from './title'

export default function LayoutDisplay({
  title,
  children,
  className,
  halfWidth = false,
  subtitle = '',
}: Readonly<{
  title?: string
  children: React.ReactNode
  className?: string
  halfWidth?: boolean
  subtitle?: string
}>) {
  return (
    <div className={cn(className)}>
      {title && <Title>{title}</Title>}
      {subtitle && <p className="mb-4 md:max-w-[75%]">{subtitle}</p>}
      <div className={cn(halfWidth ? 'md:max-w-[75%]' : '')}>{children}</div>
    </div>
  )
}
