import z from "zod";
import { createInsertSchema } from "drizzle-zod";
import { orgs } from "./schema";

export const createOrganizationSchema = createInsertSchema(orgs).omit({
  orgID:true
});