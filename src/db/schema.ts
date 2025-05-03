import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  googleId: text("google_id").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  picture: text("picture").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const typeTable = pgTable("type", {
  name: text("name").notNull().primaryKey(),
  indicators: text("indicators").array().notNull(),
});

export const entityTable = pgTable("entity", {
  id: text("id").primaryKey(),
  lat: numeric("lat").notNull(),
  lon: numeric("lon").notNull(),
  maps: text("maps").notNull(),
  url: text("url").notNull(),
  hours: text("hours").array().notNull(),
  name: text("name").notNull(),
  type: text("type")
    .references(() => typeTable.name)
    .notNull(),
  displayType: text("display_type").notNull(),
  description: text("description").notNull(),
  timeZone: text("time_zone").notNull(),
  country: text("country").notNull(),
  zip: text("zip").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  address1: text("address1").notNull(),
  address2: text("address2").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const reviewTable = pgTable("review", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  entityId: text("entity_id")
    .notNull()
    .references(() => entityTable.id),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  indicators: text("indicators").array().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Type = InferSelectModel<typeof typeTable>;
export type Entity = InferSelectModel<typeof entityTable>;
export type Review = InferSelectModel<typeof reviewTable>;
