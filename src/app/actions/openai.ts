'use server';

import OpenAI from "openai";
import { actionClient } from "./safe-action";
import { z } from "zod";
import { returnValidationErrors } from "next-safe-action";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const checkClientValid = actionClient
    .use(async ({next}) => {

        if (!client) return returnValidationErrors(
            z.null(), {_errors: ["OpenAI client is uninitialized."]}
        );

        const assistantID = process.env.OPENAI_ASSISTANT_ID;
        if (!assistantID) return returnValidationErrors(
            z.null(), {_errors: ["Unable to find env.OPENAI_ASSISTANT_ID."]}
        );

        return next({ctx: {assistantID}});
    }
);

export const createThreadAction = checkClientValid
    .action(async ({ctx: {assistantID}}) => {

        const thread = await client.beta.threads.create({
            metadata: {
                assistantID: assistantID
            }
        });

        return {success: true, thread: thread };
    }
);

const queryParams = z.object({
    threadID: z.string(),
    query: z.string()
});

export const sendQueryAction = checkClientValid
    .schema(queryParams)
    .action(async ({parsedInput: {threadID, query}}) => {

        const res = await client.beta.threads.messages.create(threadID, {
            role: 'user',
            content: query,
        });

        return { success: true, res: res};
    }
);