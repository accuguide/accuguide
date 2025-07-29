import Link from 'next/link'
import Title from '@/components/layout/title'

export default function NotFound() {
  return (
    <div>
      <Title>Page Not Found</Title>
      <p>
        Sorry, the page you are looking for does not exist. You can go back to
        the homepage from{' '}
        <Link href="/" className="underline">
          here
        </Link>
        .
      </p>
    </div>
  )
}
