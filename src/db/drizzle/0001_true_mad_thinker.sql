ALTER TABLE "orgs" ALTER COLUMN "orgID" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_orgName_unique" UNIQUE("orgName");