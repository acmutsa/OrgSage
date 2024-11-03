import {
  createSafeActionClient,
  returnValidationErrors,
} from "next-safe-action";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/db/functions";
import { z } from "zod";

export const actionClient = createSafeActionClient();

export const authenticatedAction = actionClient.use(
  // TODO: Add registration check here?
  async ({ next, }) => {
    const { userId } = await auth();
    if (!userId)
      returnValidationErrors(z.null(), {
        _errors: ["Unauthorized (No User ID)"],
      });
    return next({ ctx: { userId } });
  }
);

export const registeredUserAction = authenticatedAction.use(async ({ next, ctx }) => {
  const user = await getUser(ctx.userId);
  if (!user) {
    returnValidationErrors(z.null(), {
      _errors: ["Please register before doing this action."],
    });
  }
  return next({ ctx: { user, ...ctx } });
});

