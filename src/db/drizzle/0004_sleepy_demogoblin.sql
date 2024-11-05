ALTER TABLE "chats" ADD COLUMN IF NOT EXISTS "orgID_temp" UUID; --> statement-breakpoint
ALTER TABLE "models" ADD COLUMN IF NOT EXISTS "orgID_temp" UUID; --> statement-breakpoint
ALTER TABLE "users_to_orgs" ADD COLUMN IF NOT EXISTS "orgID_temp"  UUID; --> statement-breakpoint
ALTER TABLE "orgs" ALTER COLUMN "profileUrl" DROP NOT NULL;--> statement-breakpoint
UPDATE "chats" SET "orgID_temp" = "orgID"::UUID; --> statement-breakpoint
UPDATE "models" SET "orgID_temp" = "orgID"::UUID; --> statement-breakpoint
UPDATE "users_to_orgs" SET "orgID_temp" = "orgID"::UUID; --> statement-breakpoint