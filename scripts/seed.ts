import { exit } from 'process'
import { db } from '@/lib/db'
import { account, session, user, verification } from '@/lib/db/auth-schema'
import {
  categoryTable,
  emailTable,
  entityTable,
  FaqTable,
  indicatorTable,
  jobTable,
  resourceTable,
  reviewIndicatorTable,
  reviewTable,
  typeIndicatorTable,
  typeMappingTable,
  typeTable,
} from '@/lib/db/schema'

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
    await db.delete(resourceTable)
    await db.delete(jobTable)
    await db.delete(FaqTable)
    await db.delete(emailTable)
    await db.delete(user)
    console.log('Database cleared.')

    const users = [
      {
        id: 'G9n9YR2Z0kEMSVdCtUevHhhsX3MRs8rE',
        name: 'John Doe',
        email: 'name@example.com',
        emailVerified: true,
        role: 'admin',
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
    const resources = [
      {
        title: 'Americans with Disabilities Act (ADA) Complaint Center',
        description:
          'The Americans with Disabilities Act provides an important tool to fight discrimination: configure filing a complaint with an appropriate federal agency. This link outlines the steps to get you started.',
        url: 'https://www.ada.gov/file-a-complaint/',
        category: 'Career Resources',
        state: 'California',
        country: 'Canada',
        updatedAt: new Date(),
      },
      {
        title: 'Disability Rights - American Civil Liberties Union (ACLU)',
        description:
          'People with disabilities face widespread discrimination, segregation, and exclusion. But federal disability rights laws can provide protection.',
        url: 'https://www.aclu.org/know-your-rights/disability-rights',
        category: 'Legal Resources',
        state: 'National',
        country: 'USA',
        updatedAt: new Date(),
      },
    ]
    const jobs = [
      {
        title: 'Blogger',
        description:
          "Write and publish blog posts on topics related to accessibility, disability rights, and inclusive design on our platform's blog. No experience required, but knowledge of topics and strong writing skills are a plus!",
        responsibilities: [
          'Research accessibility-related topics',
          'Provide guidance on WCAG 2.1 AA compliance',
          'Collaborate with design and development teams',
          'Create and maintain accessibility documentation',
        ],
        link: null,
      },
      {
        title: 'Reviewer',
        description:
          'Document accessibility of public places in your area by writing accessibility-reviews on our platform. No experience required, just a passion for accessibility and attention to detail!',
        responsibilities: [
          'Conduct user research with diverse participants',
          'Analyze accessibility barriers in current designs',
          'Present findings to stakeholders',
          'Develop inclusive design guidelines',
        ],
        link: null,
      },
      {
        title: 'Social Media Manager',
        description:
          'Manage our social media presence to spread awareness about accessibility and disability rights. Create engaging content and build our online community.',
        responsibilities: [
          'Create and schedule social media content across platforms',
          'Engage with followers and respond to comments',
          'Track analytics and report on social media performance',
          'Collaborate with content team on campaigns',
        ],
        link: null,
      },
      {
        title: 'Software Engineer Volunteer',
        description:
          'Work on feature improvements and bug fixes for our platform. Check us out on Github to get started with contributing!',
        responsibilities: [
          'Write clean, maintainable code following best practices',
          'Participate in code reviews and provide constructive feedback',
          'Collaborate with cross-functional teams to define and implement new features',
        ],
        link: 'https://github.com/accuguide/accuguide',
      },
    ]
    const faqs = [
      {
        question: 'Is my data safe?',
        answer:
          'We take your privacy and security very seriously. We only save the personal data that is necessary for you to maintain an account with us, should you choose to login. Your data stays on our servers and is never sold or given to third parties. See our privacy policy for more information.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'For now, please send us an email with the email address associated with your Accuguide account and we can remove all your data from our servers.',
      },
      {
        question:
          "I'm a developer and I want to contribute to Accuguide. How can I help?",
        answer:
          'Check out our Github repository at github.com/accuguide/accuguide to get started!',
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
    await db.insert(resourceTable).values(resources)
    await db.insert(jobTable).values(jobs)
    await db.insert(FaqTable).values(faqs)
    await db.insert(account).values(accounts)
    console.log('Database seeded successfully.')
    exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

main()
