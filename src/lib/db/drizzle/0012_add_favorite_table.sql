CREATE TABLE "favorite" (
"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
"user_id" text NOT NULL,
"entity_id" uuid NOT NULL,
"created_at" timestamp with time zone DEFAULT now() NOT NULL,
CONSTRAINT "favorite_user_id_entity_id_unique" UNIQUE("user_id", "entity_id")
);
--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_entity_id_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entity"("id") ON DELETE cascade ON UPDATE cascade;
