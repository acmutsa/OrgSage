"use server";
import { registeredUserAction } from "./safe-action";
import { createOrganizationSchema } from "@/db/zod";
export const createOrganization = registeredUserAction
.schema(createOrganizationSchema)
.action(async ({ ctx: {user,userId} }) => {
  



});