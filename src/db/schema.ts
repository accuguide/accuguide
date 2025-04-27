import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";

export const typeEnum = pgEnum("type_enum", ["Restaurant", "Bar"]);
export const indicatorEnum = pgEnum("indicator_enum", [
  "Braille Menu",
  "ADA Compliant Restroom",
]);
export const ratingEnum = pgEnum("rating_enum", ["0", "1", "2", "3", "4", "5"]);

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  googleId: text("google_id").notNull(),
  name: text("name").notNull(),
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

export const entityTable = pgTable("entity", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  lat: integer("lat").notNull(),
  lon: integer("lon").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  zip: text("zip").notNull(),
  street: text("street").notNull(),
  number: integer("number").notNull(),
  unit: text("unit").notNull(),
  phone: text("phone").notNull(),
  link: text("link").notNull(),
  website: text("website").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const ReviewTable = pgTable("review", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id),
  entityId: serial("entity_id")
    .notNull()
    .references(() => entityTable.id),
  rating: integer("rating").notNull(),
  indicators: json("indicators").$type<(typeof indicatorEnum)[]>().notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Entity = InferSelectModel<typeof entityTable>;
export type Review = InferSelectModel<typeof ReviewTable>;
