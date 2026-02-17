import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { entityTable } from '@/lib/db/schema'

export default async function FavoriteDisplay({
  entityId,
}: {
  entityId: string
}) {
  const entity_raw = await db
    .select()
    .from(entityTable)
    .where(eq(entityTable.id, entityId))

  const entity = entity_raw[0]
  return (
    <div>
      <div className="font-bold text-sm">{entity.name}</div>
      <p className="secondary-text mt-0 text-xs">{entity.type}</p>
      <p className="secondary-text mt-2 font-semibold text-sm">
        {entity.address1}
      </p>
      <p className="secondary-text font-semibold text-sm">{entity.address2}</p>
      <p className="secondary-text -mt-5 mb-8 font-semibold text-sm">
        {entity.city}, {entity.state} {entity.zip}
      </p>
    </div>
  )
}
