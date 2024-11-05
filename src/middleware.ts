import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { getUser } from "./db/functions";
import { NextResponse } from "next/server";
export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
      // Always run for API routes
      "/(api|trpc)(.*)",
    ],
};

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    console.log("middleware");
    if (isPublicRoute(req)) return;
    console.log("Got past this");
    const { userId: userID, redirectToSignIn } = await auth();
    if (!userID) redirectToSignIn();
    console.log('checking for user prescence')
    const currUser = await getUser(userID!);
    if (!currUser) return NextResponse.rewrite(new URL("/onboarding", req.url));
});
