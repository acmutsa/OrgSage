import { createInsertSchema } from "drizzle-zod";
import { orgs,users } from "./schema";

export const createOrganizationSchema = createInsertSchema(orgs).omit({
  orgID:true
});

export const createUserSchema = createInsertSchema(users);