import { eq } from 'drizzle-orm'
import SearchDisplay from '@/components/search/search-display'
import { db } from '@/lib/db'
import { entityTable, favoriteTable } from '@/lib/db/schema'
import { getServerUser } from '@/lib/session'

export default async function Page() {
  const user = await getServerUser()
  
  if (!user) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="space-y-12">
          <div>
            <h1 className="font-bold text-2xl">Favorites</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to view your favorite locations.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const favorites = await db
    .select({
      id: favoriteTable.id,
      entityId: favoriteTable.entityId,
      createdAt: favoriteTable.createdAt,
      entity: entityTable,
    })
    .from(favoriteTable)
    .innerJoin(entityTable, eq(favoriteTable.entityId, entityTable.id))
    .where(eq(favoriteTable.userId, user.id))
    .orderBy(favoriteTable.createdAt)

  return (
    <div className="mx-auto max-w-7xl">
      <div className="space-y-12">
        <div>
          <h1 className="font-bold text-2xl">Favorites</h1>
          <p className="mt-2 text-muted-foreground">
            Your saved locations for easy access.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              You haven't favorited any locations yet. Start exploring and add
              your favorite places!
            </p>
          </div>
        ) : (
          <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((favorite) => (
              <SearchDisplay
                key={favorite.entityId}
                displayType="db"
                id={favorite.entity.id}
                googleId={favorite.entity.googleId}
                name={favorite.entity.name}
                type={favorite.entity.type}
                address={`${favorite.entity.address1}${favorite.entity.address2 ? ', ' + favorite.entity.address2 : ''}, ${favorite.entity.city}, ${favorite.entity.state} ${favorite.entity.zip}`}
                aiScore={
                  favorite.entity.aiScore
                    ? Number(favorite.entity.aiScore)
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
