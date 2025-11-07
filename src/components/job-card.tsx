import Link from 'next/link'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import type { Job } from '@/lib/db/schema'

export default function JobCard({
  title,
  description,
  responsibilities,
  link,
}: Job) {
  return (
    <Card className="mb-8 md:max-w-[75%]">
      <CardTitle className="px-6 font-bold">{title}</CardTitle>
      {/* <p className="px-6 text-xs -mt-2 secondary-text">Job Resource</p> */}

      <CardContent>
        <p className="-mt-2 mb-2">{description}</p>
        {responsibilities && responsibilities.length > 0 && (
          <ul className="list-disc list-inside">
            {responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        )}
        {link && <div className="h-2" />}
        {link && (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
