import Link from 'next/link'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

interface ResourceCardProps {
  title: string
  description: string
  link: string
}

export default function ResourceCard({
  title,
  description,
  link,
}: ResourceCardProps) {
  return (
    <Card className="mt-4 md:max-w-[50%]">
      <CardTitle className="my-0 px-6">{title}</CardTitle>
      <CardContent>
        <p className="mt-[-8px] mb-2">{description}</p>
        <p>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {link}
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
