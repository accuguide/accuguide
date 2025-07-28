import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface ErrorCardProps {
  title: string
  description: string
  link?: {
    href: string
    label: string
  }
}

const ErrorCard: React.FC<ErrorCardProps> = ({ title, description, link }) => {
  return (
    <Card className="bg-red-500/25 border-red-600 dark:border-red-800 shadow-md">
      <CardHeader className="mb-[-20px]">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        {link && (
          <Link href={link.href} className=" text-sm hover:underline">
            {link.label}
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export default ErrorCard
