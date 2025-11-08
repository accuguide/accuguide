import type { LucideIcon } from 'lucide-react'
import CountUpNumber from './count-up-number'

interface StatCardProps {
  name: string
  value: number
  icon: LucideIcon
  color: string
}

export default function StatCard({
  name,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="flex flex-col bg-slate-400/5 p-8 dark:bg-slate-800">
      <Icon className={`mx-auto mb-4 h-10 w-10 ${color}`} />
      <div className={`font-semibold text-3xl tracking-tight ${color}`}>
        <CountUpNumber value={value} />
      </div>
      <p className="mt-4 font-bold text-lg">{name}</p>
    </div>
  )
}
