import * as React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

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
      <CardTitle className="px-6 my-0">{title}</CardTitle>
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
