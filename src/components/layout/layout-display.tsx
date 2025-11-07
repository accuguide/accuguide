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
    <div className={cn(className) + ' mx-auto max-w-7xl'}>
      {title && <Title>{title}</Title>}
      {subtitle && <p className="md:max-w-[75%]">{subtitle}</p>}
      {title && subtitle && <div className="h-12"></div>}
      {title && !subtitle && <div className="h-8"></div>}
      <div className={cn(halfWidth ? 'md:max-w-[75%]' : '')}>{children}</div>
    </div>
  )
}
