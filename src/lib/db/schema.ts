import type { InferSelectModel } from 'drizzle-orm'
import {
  boolean,
  integer,
  json,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const typeTable = pgTable('type', {
  type: text('type').primaryKey(),
  physical: boolean('physical').notNull().default(true),
})

export const indicatorTable = pgTable('indicator', {
  indicator: text('indicator').primaryKey(),
  description: text('description').notNull().default(''),
  category: text('category')
    .notNull()
    .default('')
    .references(() => categoryTable.category, {
      onUpdate: 'cascade',
    }),
})

export const categoryTable = pgTable('category', {
  category: text('category').primaryKey(),
})

export const typeIndicatorTable = pgTable('type_indicator', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type')
    .notNull()
    .references(() => typeTable.type, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  indicator: text('indicator')
    .notNull()
    .references(() => indicatorTable.indicator, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
})

export const typeMappingTable = pgTable('type_mapping', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type')
    .notNull()
    .references(() => typeTable.type, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  pattern: text('pattern').notNull(), // The string pattern to match against
  priority: integer('priority').notNull().default(0), // For ordering matches (higher priority first)
})

export const entityTable = pgTable('entity', {
  id: uuid('id').primaryKey().defaultRandom(),
  googleId: text('google_id').notNull().unique(),
  lat: numeric('lat').notNull(),
  lon: numeric('lon').notNull(),
  maps: text('maps').notNull(),
  url: text('url').notNull(),
  hours: text('hours').array().notNull(),
  name: text('name').notNull(),
  type: text('type')
    .notNull()
    .references(() => typeTable.type, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  displayType: text('display_type').notNull(),
  description: text('description').notNull(),
  timeZone: text('time_zone').notNull(),
  country: text('country').notNull(),
  zip: text('zip').notNull(),
  state: text('state').notNull(),
  city: text('city').notNull(),
  address1: text('address1').notNull(),
  address2: text('address2').notNull(),
  aiSummary: text('ai_summary'),
  aiScore: numeric('ai_score'),
  aiIndicators:
    jsonb('ai_indicators').$type<{ indicator: string; exists: boolean }[]>(),
  aiUpdatedAt: timestamp('ai_updated_at', {
    withTimezone: true,
    mode: 'date',
  }),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
})

export const reviewTable = pgTable('review', {
  id: uuid('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  entityId: uuid('entity_id')
    .notNull()
    .references(() => entityTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
})

export const reviewIndicatorTable = pgTable('review_indicator', {
  id: uuid('id').primaryKey().defaultRandom(),
  reviewId: uuid('review_id')
    .notNull()
    .references(() => reviewTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  indicator: text('indicator')
    .notNull()
    .references(() => indicatorTable.indicator, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  exists: boolean('exists'),
})

export const emailTable = pgTable('email', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  subscribed: boolean('subscribed').notNull().default(true),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
})

export const resourceTable = pgTable('resource', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  url: text('url').notNull(),
  category: text('category').notNull(),
  state: text('state').notNull(),
  country: text('country').notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
})

export const jobTable = pgTable('job', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  responsibilities: json('responsibilities').$type<string[]>(),
  link: text('link'),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
})

export const FaqTable = pgTable('faq', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
})

export type Type = InferSelectModel<typeof typeTable>
export type Indicator = InferSelectModel<typeof indicatorTable>
export type Category = InferSelectModel<typeof categoryTable>
export type TypeMapping = InferSelectModel<typeof typeMappingTable>
export type TypeIndicator = InferSelectModel<typeof typeIndicatorTable>
export type Entity = InferSelectModel<typeof entityTable>
export type Review = InferSelectModel<typeof reviewTable>
export type ReviewIndicator = InferSelectModel<typeof reviewIndicatorTable>
export type Resource = InferSelectModel<typeof resourceTable>
export type Job = InferSelectModel<typeof jobTable>
export type Faq = InferSelectModel<typeof FaqTable>
