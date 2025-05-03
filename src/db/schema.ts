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
  lon: numeric("lng").notNull(),
  maps: text("maps").notNull(),
  url: text("url"),
  hours: text("hours").array(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  utc: integer("utc"),
  country: text("country"),
  zip: text("zip"),
  state: text("state"),
  city: text("city"),
  address1: text("address1"),
  address2: text("address2"),
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
  indicators: text("indicators").array().notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Type = InferSelectModel<typeof typeTable>;
export type Entity = InferSelectModel<typeof entityTable>;
export type Review = InferSelectModel<typeof reviewTable>;
