import { db,eq } from "."
import { users,orgs,usersToOrgs } from "./schema"
import { createUserSchema } from "./zod";
import z from "zod";
import {nanoid} from "nanoid"
type userProps = z.infer<typeof createUserSchema>

export async function getUser(id:string){
  return db.query.users.findFirst({
    where:eq(users.clerkID,id)
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
        orgID: nanoid(),
        orgName,
        profileUrl,
      })
      .returning({ orgID: orgs.orgID });
    await tx.insert(usersToOrgs).values({
      orgID: res[0].orgID,
      userID,
      roles: "owner",
      hasAccepted: true,
    });
    return res[0].orgID;
  });
  return orgID;
}

export async function deleteOrganization(orgID:string){
  // Ensure that you are able to also delete the models 
  return db.transaction(async (tx) => {
    await tx.delete(orgs).where(eq(orgs.orgID,orgID));
  });
}

export async function createUser(props:userProps){
  return db.insert(users).values(props);
}

export async function getUserOrgs(userID:string){
  return db.query.usersToOrgs.findMany({
    with:{
      orgs:true
    },
    where:eq(usersToOrgs.userID,userID)
  })
}