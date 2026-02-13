CREATE TABLE "review_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review_id" uuid NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "review_images" ADD CONSTRAINT "review_images_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE cascade ON UPDATE cascade;