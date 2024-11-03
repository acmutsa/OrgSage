"use server";
import { registeredUserAction } from "./safe-action";
import { createInviteSchema } from "@/db/zod";
import { createInvite, deleteInvite } from "@/db/functions";
import z from "zod";

export const createInviteAction = registeredUserAction
    .schema(createInviteSchema)
    .action(async ({ ctx: { userId }, parsedInput: { orgID, userID, roles, hasAccepted } }) => {
        const id = await createInvite(orgID, userID, roles, hasAccepted);
        return id;
    });

export const deleteInviteAction = registeredUserAction
    .schema(z.object({ id: z.number() }))
    .action(async ({ parsedInput: { id } }) => {
        await deleteInvite(id);
    });