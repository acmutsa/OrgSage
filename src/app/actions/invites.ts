"use server";
import { registeredUserAction } from "./safe-action";
import { createInviteSchema } from "@/db/zod";
import { acceptInvite, createInvite, deleteInvite, getUserInvites } from "@/db/functions";
import z from "zod";

export const getUserInvitesAction = registeredUserAction
    .action(async ({ctx: {userId}}) => {
        return getUserInvites(userId);
    });

export const createInviteAction = registeredUserAction
    .schema(createInviteSchema)
    .action(async ({ parsedInput: { orgID, userID, roles, hasAccepted } }) => {
        return createInvite(orgID, userID, roles, hasAccepted);
    });

export const deleteInviteAction = registeredUserAction
    .schema(z.object({ id: z.number() }))
    .action(async ({ parsedInput: { id } }) => {
        await deleteInvite(id);
    });

export const acceptInviteAction = registeredUserAction
    .schema(z.object({ id: z.number() }))
    .action(async ({ parsedInput: {id} }) => {
        await acceptInvite(id);
    });