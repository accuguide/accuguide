ALTER TABLE "category" RENAME COLUMN "description" TO "category";--> statement-breakpoint
ALTER TABLE "category" DROP CONSTRAINT "category_description_unique";--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_category_unique" UNIQUE("category");