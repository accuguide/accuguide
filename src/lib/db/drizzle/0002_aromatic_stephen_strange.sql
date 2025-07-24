CREATE TABLE "type_mapping" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"pattern" text NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "type_mapping" ADD CONSTRAINT "type_mapping_type_type_type_fk" FOREIGN KEY ("type") REFERENCES "public"."type"("type") ON DELETE cascade ON UPDATE cascade;