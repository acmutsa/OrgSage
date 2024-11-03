import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { orgs, usersToOrgs } from "./schema";

export const createOrganizationSchema = createInsertSchema(orgs).omit({
  orgID: true
});

export const createInviteSchema = createInsertSchema(usersToOrgs).omit({
  id: true
});

export const selectInviteSchema = createSelectSchema(usersToOrgs);