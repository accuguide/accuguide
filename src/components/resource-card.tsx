import Link from 'next/link'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

interface ResourceCardProps {
  title: string
  description: string
  link: string
  state: string
  country: string
  category: string
  updatedAt: string
}

export default function ResourceCard({
  title,
  description,
  link,
  state,
  updatedAt,
}: ResourceCardProps) {
  return (
    <Card className="mb-8 md:max-w-[75%]">
      <CardTitle className="my-0 px-6">{title}</CardTitle>
      <p className="px-6 text-xs -mt-2">{state} Resource</p>

      <CardContent>
        <p className="-mt-2 mb-2">{description}</p>
        <p>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            {link}
          </Link>
        </p>
        <p className="mt-2 text-xs">{'Last updated on ' + updatedAt}</p>
      </CardContent>
    </Card>
  )
}
