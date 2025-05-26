import {
  pgTable,
  text,
  integer,
  timestamp,
  numeric,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { z } from "zod";

export const TypeEnum = pgEnum("type_enum", [
  "Restaurant",
  "Cinema",
  "Cafe",
  "Bar",
  "Store",
  "Government Office",
  "University",
  "School",
  "Healthcare",
  "Venue",
  "Other",
]);

export const IndicatorEnum = pgEnum("indicator_enum", [
  "Braille Menu",
  "Wheelchair Accessible",
  "ADA Compliant Restroom",
  "Assistive Listening Devices",
  "Elevator Access",
  "Accessible Parking",
  "Accessible Restrooms",
  "Accessible Entrance",
  "Accessible Seating",
]);

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  googleId: text("google_id").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  picture: text("picture").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const typeTable = pgTable("type", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: TypeEnum("name").notNull(),
  indicator: IndicatorEnum("indicator").notNull(),
});

export const entityTable = pgTable("entity", {
  id: uuid("id").primaryKey().defaultRandom(),
  googleId: text("google_id").notNull().unique(),
  lat: numeric("lat").notNull(),
  lon: numeric("lon").notNull(),
  maps: text("maps").notNull(),
  url: text("url").notNull(),
  hours: text("hours").array().notNull(),
  name: text("name").notNull(),
  type: TypeEnum("type").notNull(),
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
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  entityId: uuid("entity_id")
    .notNull()
    .references(() => entityTable.id),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const reviewIndicatorTable = pgTable("review_indicator", {
  id: uuid("id").primaryKey().defaultRandom(),
  reviewId: uuid("review_id")
    .notNull()
    .references(() => reviewTable.id),
  indicator: IndicatorEnum("indicator").notNull(),
});

export const ZodTypeEnum = z.enum(TypeEnum.enumValues);
export const ZodIndicatorEnum = z.enum(IndicatorEnum.enumValues);

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Type = InferSelectModel<typeof typeTable>;
export type Entity = InferSelectModel<typeof entityTable>;
export type Review = InferSelectModel<typeof reviewTable>;
