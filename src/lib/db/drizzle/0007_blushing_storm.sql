ALTER TABLE "type" ADD COLUMN "physical" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "indicator" DROP COLUMN "physical";