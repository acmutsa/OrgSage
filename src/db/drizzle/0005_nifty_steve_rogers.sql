ALTER TABLE "chats" ALTER COLUMN "ChannelSplitterNode" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "ChannelSplitterNode" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "orgID" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "modelID" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "modelID" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "models" ALTER COLUMN "orgID" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "orgs" ALTER COLUMN "orgID" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "orgs" ALTER COLUMN "orgID" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users_to_orgs" ALTER COLUMN "orgID" SET DATA TYPE varchar(255);