ALTER TABLE "category" DROP CONSTRAINT "category_category_unique" CASCADE;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "category" DROP DEFAULT;