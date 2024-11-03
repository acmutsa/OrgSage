"use server";
import { registeredUserAction } from "./safe-action";
import { createOrganizationSchema } from "@/db/zod";
import { createOrganization,deleteOrganization} from "@/db/functions";
import z from "zod";

export const createOrganizationAction = registeredUserAction
.schema(createOrganizationSchema)
.action(async ({ ctx: {userId}, parsedInput:{orgName,profileUrl} }) => {
  const orgID = await createOrganization(orgName,profileUrl,userId);
  return orgID;
});

export const deleteOrganizationAction = registeredUserAction
.schema(z.object({orgID:z.string().min(1).max(255)}))
.action(async ({parsedInput:{orgID} }) => {
  await deleteOrganization(orgID);
});