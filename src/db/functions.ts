import { db,eq } from "."
import { users, orgs, usersToOrgs } from "./schema"

export async function getUser(id: string){
  return db.query.users.findFirst({
    where: eq(users.clerkID, id)
  })
}

export async function createOrganization(
  orgName: string,
  profileUrl: string | null | undefined,
  userID: string
) {
  const orgID = await db.transaction(async (tx) => {
    const res = await tx
      .insert(orgs)
      .values({
        orgName,
        profileUrl,
      })
      .returning({ orgID: orgs.orgID });
    createInvite(orgID, userID, "owner", true);
    return res[0].orgID;
  });
  return orgID;
}

export async function deleteOrganization(orgID: string){
  // Ensure that you are able to also delete the models 
  return db.transaction(async (tx) => {
    await tx.delete(orgs).where(eq(orgs.orgID, orgID));
  });
}

export async function getUserInvites(userID: string) {
    db.query.usersToOrgs.findMany({
        where: eq(usersToOrgs.userID, userID)
    });
}

export async function createInvite(
    orgID: string,
    userID: string,
    roles: "owner" | "member",
    hasAccepted?: boolean
) {
  const id = await db.transaction(async (tx) => {
    const res = await tx
      .insert(usersToOrgs)
      .values({
        orgID,
        userID,
        roles,
        hasAccepted
      })
      .returning({ id: usersToOrgs.id });
    return res[0].id;
  });
  return id;
}

export async function deleteInvite(id: number){
  return db.transaction(async (tx) => {
    await tx.delete(usersToOrgs).where(eq(usersToOrgs.id, id));
  });
}