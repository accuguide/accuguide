import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataTableProps {
  headers?: string[]
  children: ReactNode
}

export function DataTable({ headers, children }: DataTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
      {headers && (
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={cn(
                  'py-3.5 text-left font-semibold text-sm',
                  index === 0 ? 'pr-3 pl-4 sm:pl-0' : 'px-3',
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className="divide-y divide-gray-200 dark:divide-white/10">
        {children}
      </tbody>
    </table>
  )
}
