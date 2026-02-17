CREATE TABLE "resource" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"url" text NOT NULL,
	"category" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
