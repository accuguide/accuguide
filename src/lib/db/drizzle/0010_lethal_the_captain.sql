ALTER TABLE "entity" ADD COLUMN "ai_summary" text;--> statement-breakpoint
ALTER TABLE "entity" ADD COLUMN "ai_score" numeric;--> statement-breakpoint
ALTER TABLE "entity" ADD COLUMN "ai_indicators" jsonb;--> statement-breakpoint
ALTER TABLE "entity" ADD COLUMN "ai_updated_at" timestamp with time zone;