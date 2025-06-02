CREATE TYPE "public"."indicator_enum" AS ENUM('Braille Menu', 'Wheelchair Accessible', 'ADA Compliant Restroom', 'Assistive Listening Devices', 'Elevator Access', 'Accessible Parking', 'Accessible Restrooms', 'Accessible Entrance', 'Accessible Seating');--> statement-breakpoint
CREATE TYPE "public"."type_enum" AS ENUM('Restaurant', 'Cinema', 'Cafe', 'Bar', 'Store', 'Government Office', 'University', 'School', 'Healthcare', 'Venue', 'Other');--> statement-breakpoint
CREATE TABLE "entity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_id" text NOT NULL,
	"lat" numeric NOT NULL,
	"lon" numeric NOT NULL,
	"maps" text NOT NULL,
	"url" text NOT NULL,
	"hours" text[] NOT NULL,
	"name" text NOT NULL,
	"type" "type_enum" NOT NULL,
	"display_type" text NOT NULL,
	"description" text NOT NULL,
	"time_zone" text NOT NULL,
	"country" text NOT NULL,
	"zip" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"address1" text NOT NULL,
	"address2" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "entity_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE "review_indicator" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review_id" uuid NOT NULL,
	"indicator" "indicator_enum" NOT NULL,
	"exists" boolean
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"entity_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "type_enum" NOT NULL,
	"indicator" "indicator_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"picture" text NOT NULL,
	"admin" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "review_indicator" ADD CONSTRAINT "review_indicator_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_entity_id_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;