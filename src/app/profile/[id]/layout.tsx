import { eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import LayoutDisplay from '@/components/layout/layout-display'
import { db } from '@/lib/db'
import { user } from '@/lib/db/auth-schema'
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  const userProfile = await db
    .select({ id: user.id, name: user.name })
    .from(user)
    .where(eq(user.id, id))
    .limit(1)

  return {
    title: `${userProfile[0]?.name || 'Unknown User'}'s Profile`,
    description: `Profile page of ${userProfile[0]?.name || 'a user'} on Accuguide`,

    alternates: {
      canonical: `/profile/${userProfile[0].id}/`,
    },
  }
}

export default async function SearchLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  const userProfile = await db
    .select({
      id: user.id,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.id, id))
    .limit(1)

  return (
    <LayoutDisplay
      title={(userProfile[0]?.name || 'Unknown User') + "'s Profile"}
      subtitle={`Member since ${userProfile[0]?.createdAt.toLocaleDateString() || 'Unknown Date'}`}
    >
      {children}
    </LayoutDisplay>
  )
}
