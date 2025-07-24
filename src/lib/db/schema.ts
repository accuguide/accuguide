import {
  pgTable,
  text,
  integer,
  timestamp,
  numeric,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { user } from "./auth-schema";

export const typeTable = pgTable("type", {
  type: text("type").primaryKey(),
});

export const indicatorTable = pgTable("indicator", {
  indicator: text("indicator").primaryKey(),
});

export const typeIndicatorTable = pgTable("type_indicator", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type")
    .notNull()
    .references(() => typeTable.type, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  indicator: text("indicator")
    .notNull()
    .references(() => indicatorTable.indicator, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
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
  type: text("type")
    .notNull()
    .references(() => typeTable.type, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
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
  id: uuid("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  entityId: uuid("entity_id")
    .notNull()
    .references(() => entityTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
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
    .references(() => reviewTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  indicator: text("indicator")
    .notNull()
    .references(() => indicatorTable.indicator, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  exists: boolean("exists"),
});

export const emailTable = pgTable("email", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  subscribed: boolean("subscribed").notNull().default(true),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export type Type = InferSelectModel<typeof typeTable>;
export type Entity = InferSelectModel<typeof entityTable>;
export type Review = InferSelectModel<typeof reviewTable>;
export type ReviewIndicator = InferSelectModel<typeof reviewIndicatorTable>;
