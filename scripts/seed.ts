import { db } from '@/lib/db'
import { account, session, user, verification } from '@/lib/db/auth-schema'
import {
  categoryTable,
  emailTable,
  entityTable,
  indicatorTable,
  reviewIndicatorTable,
  reviewTable,
  typeIndicatorTable,
  typeMappingTable,
  typeTable,
} from '@/lib/db/schema'
import { exit } from 'process'

const main = async () => {
  try {
    console.log('Seeding database...')

    await db.delete(account)
    await db.delete(session)
    await db.delete(verification)
    await db.delete(reviewIndicatorTable)
    await db.delete(reviewTable)
    await db.delete(entityTable)
    await db.delete(typeIndicatorTable)
    await db.delete(typeMappingTable)
    await db.delete(typeTable)
    await db.delete(indicatorTable)
    await db.delete(categoryTable)
    await db.delete(emailTable)
    await db.delete(user)
    console.log('Database cleared.')

    const users = [
      {
        id: 'G9n9YR2Z0kEMSVdCtUevHhhsX3MRs8rE',
        name: 'John Doe',
        email: 'name@example.com',
        emailVerified: true,
      },
    ]
    const emails = [{ email: 'name@example.com', subscribed: true }]
    const categories = [
      { category: '' },
      { category: 'General' },
      { category: 'Bathroom' },
    ]
    const indicators = [
      {
        indicator: 'ADA Parking',
        description: 'Accessible parking spaces',
        category: 'General',
        physical: true,
      },
      {
        indicator: 'Automatic Sink',
        description: 'Automatic sinks in bathrooms',
        category: 'Bathroom',
        physical: true,
      },
    ]
    const types = [
      { type: 'Restaurant' },
      { type: 'School' },
      { type: 'University' },
      { type: 'Bathroom' },
      { type: 'Other' },
    ]
    const typeMappings = [
      { type: 'Restaurant', pattern: 'Restaurant' },
      { type: 'Restaurant', pattern: 'Bakery' },
      { type: 'School', pattern: 'School' },
      { type: 'University', pattern: 'University' },
    ]

    const typeIndicators = [
      { type: 'Restaurant', indicator: 'ADA Parking' },
      { type: 'Bathroom', indicator: 'Automatic Sink' },
    ]

    const entities = [
      {
        id: '2028b04a-8849-44b9-ae68-c9fd826d94be',
        googleId: 'ChIJR1988Qm7j4ARi_KmggVETuc',
        lat: '37.4454813',
        lon: '-122.16072450000001',
        maps: 'https://maps.google.com/?cid=16667334061402288779',
        url: 'http://www.ramennagiusa.com/',
        hours: [
          'Monday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM',
          'Tuesday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM',
          'Wednesday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM',
          'Thursday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM',
          'Friday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM',
          'Saturday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM',
          'Sunday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM',
        ],
        name: 'Ramen Nagi',
        type: 'Restaurant',
        displayType: 'Ramen Restaurant',
        description:
          'Japanese noodle chain outpost offering customizable ramen bowls and vibrant-colored broths.',
        timeZone: 'America/Los_Angeles',
        country: 'US',
        zip: '94301',
        state: 'California',
        city: 'Palo Alto',
        address1: '541 Bryant St',
        address2: '',
        createdAt: new Date('2025-06-05T20:24:00.341Z'),
      },
    ]
    const reviews = [
      {
        id: '0156e608-f6a0-4283-bbbf-9d25555d69c9',
        userId: 'G9n9YR2Z0kEMSVdCtUevHhhsX3MRs8rE',
        entityId: '2028b04a-8849-44b9-ae68-c9fd826d94be',
        rating: 4,
        comment:
          "Ramen Nagi has great food and while it is a tight space, the staff are helpful and their location has accessible seating and an automatic door at the entrance. They don't have any sensory friendly spaces or contactless ordering, but they have accessible bathrooms",
      },
    ]

    const reviewIndicators = [
      {
        id: '1051bd5f-42cd-4719-88d7-7683137acef5',
        reviewId: '0156e608-f6a0-4283-bbbf-9d25555d69c9',
        indicator: 'ADA Parking',
        exists: true,
      },
      {
        id: '1051bd5f-42cd-4719-88d7-7683137acef7',
        reviewId: '0156e608-f6a0-4283-bbbf-9d25555d69c9',
        indicator: 'Automatic Sink',
        exists: false,
      },
    ]
    const accounts = [
      {
        id: '39pxnua0J3CmjGy2CfihIVTIvNXu64VE',
        accountId: 'G9n9YR2Z0kEMSVdCtUevHhhsX3MRs8rE',
        providerId: 'credential',
        userId: 'G9n9YR2Z0kEMSVdCtUevHhhsX3MRs8rE',
        password:
          '18222d720ed9fbb657c855918bd0bb4f:d97cb9baa4c2ecf96ba803265132e1b6a7f65d97bea4c7e070d11b785b6bba7be785493db7b33939cda0e22682e8c2a493b2b6b06d77713635a4a8f8b54d5c5b',
        createdAt: new Date('2025-07-24 19:40:20.696Z'),
        updatedAt: new Date('2025-07-24 19:40:20.696Z'),
      },
    ]

    await db.insert(user).values(users)
    await db.insert(emailTable).values(emails)
    await db.insert(categoryTable).values(categories)
    await db.insert(indicatorTable).values(indicators)
    await db.insert(typeTable).values(types)
    await db.insert(typeMappingTable).values(typeMappings)
    await db.insert(typeIndicatorTable).values(typeIndicators)
    await db.insert(entityTable).values(entities)
    await db.insert(reviewTable).values(reviews)
    await db.insert(reviewIndicatorTable).values(reviewIndicators)
    await db.insert(account).values(accounts)
    console.log('Database seeded successfully.')
    exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

main()
