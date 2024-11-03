/// @ts-nocheck
import { db, eq, and } from "@/db";
import { orgs } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
export default async function Page(params: Promise<{ orgid: string }>) {
  const { userId } = await auth();
  const orgid = (await params).orgid;
  console.log(orgid);
  const org = await db.query.orgs.findFirst({
    where: eq(orgs.orgID, orgid),
  });
  console.log("org: ", org);
  if (!org) {
    return redirect("/not_found");
  }
}
