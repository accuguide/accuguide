CREATE TABLE "entity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_id" text NOT NULL,
	"lat" numeric NOT NULL,
	"lon" numeric NOT NULL,
	"maps" text NOT NULL,
	"url" text NOT NULL,
	"hours" text[] NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
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
CREATE TABLE "indicator" (
	"indicator" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_indicator" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review_id" uuid NOT NULL,
	"indicator" text NOT NULL,
	"exists" boolean
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type_indicator" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"indicator" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type" (
	"type" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "entity" ADD CONSTRAINT "entity_type_type_type_fk" FOREIGN KEY ("type") REFERENCES "public"."type"("type") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_indicator" ADD CONSTRAINT "review_indicator_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_indicator" ADD CONSTRAINT "review_indicator_indicator_indicator_indicator_fk" FOREIGN KEY ("indicator") REFERENCES "public"."indicator"("indicator") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_entity_id_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "type_indicator" ADD CONSTRAINT "type_indicator_type_type_type_fk" FOREIGN KEY ("type") REFERENCES "public"."type"("type") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "type_indicator" ADD CONSTRAINT "type_indicator_indicator_indicator_indicator_fk" FOREIGN KEY ("indicator") REFERENCES "public"."indicator"("indicator") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;