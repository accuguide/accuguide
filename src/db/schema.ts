import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  timestamp,
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

export const typeTable = pgTable("type", {
  type: typeEnum("type").notNull().primaryKey(),
  indicators: indicatorEnum("indicators").array().notNull(),
});

export const entityTable = pgTable("entity", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: typeEnum("type")
    .notNull()
    .references(() => typeTable.type),
  description: text("description").notNull(),
  lat: integer("lat"),
  lon: integer("lon"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  zip: text("zip"),
  street: text("street"),
  number: integer("number"),
  unit: text("unit"),
  phone: text("phone"),
  link: text("link"),
  website: text("website"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const reviewTable = pgTable("review", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  entityId: integer("entity_id")
    .notNull()
    .references(() => entityTable.id),
  rating: integer("rating").notNull(),
  indicators: indicatorEnum("indicators").array().notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Type = InferSelectModel<typeof typeTable>;
export type Entity = InferSelectModel<typeof entityTable>;
export type Review = InferSelectModel<typeof reviewTable>;
