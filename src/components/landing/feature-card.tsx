import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  name: string
  description: string
  icon: LucideIcon
  iconBg: string
}

export default function FeatureCard({
  name,
  description,
  icon: Icon,
  iconBg,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col">
      <dt className="font-bold text-lg">
        <div
          className={`mb-2 flex size-10 items-center justify-center rounded-lg md:mb-6 ${iconBg}`}
        >
          <Icon aria-hidden="true" className="size-6 text-slate-100" />
        </div>
        {name}
      </dt>
      <dd className="secondary-text mt-2 font-semibold text-base">
        {description}
      </dd>
    </div>
  )
}
