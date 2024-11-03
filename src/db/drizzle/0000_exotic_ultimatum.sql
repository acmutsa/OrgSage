CREATE TYPE "public"."roles" AS ENUM('owner', 'member');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"ChannelSplitterNode" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text,
	"userID" varchar(255) NOT NULL,
	"orgID" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "models" (
	"modelID" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orgID" varchar(255) NOT NULL,
	"modelString" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orgs" (
	"orgID" uuid PRIMARY KEY NOT NULL,
	"orgName" varchar(255) NOT NULL,
	"profileUrl" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"clerk_id" varchar(255) PRIMARY KEY NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_orgs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"orgID" varchar(255) NOT NULL,
	"userID" varchar(255) NOT NULL,
	"roles" "roles" NOT NULL,
	"hasAccepted" varchar(255) DEFAULT 'false' NOT NULL
);
