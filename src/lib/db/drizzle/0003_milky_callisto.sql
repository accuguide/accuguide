CREATE TABLE "category" (
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "category_description_unique" UNIQUE("description")
);
--> statement-breakpoint
ALTER TABLE "indicator" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "indicator" ADD COLUMN "category" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "indicator" ADD COLUMN "physical" boolean DEFAULT true NOT NULL;