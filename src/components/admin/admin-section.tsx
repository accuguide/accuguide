import { ReactNode } from 'react'

interface AdminSectionProps {
  title: string
  description: string
  actionArea?: ReactNode
  children: ReactNode
}

export function AdminSection({
  title,
  description,
  actionArea,
  children,
}: AdminSectionProps) {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="font-semibold text-base">{title}</h1>
          <p className="mt-2 text-sm">{description}</p>
        </div>
        {actionArea && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">{actionArea}</div>
        )}
      </div>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
