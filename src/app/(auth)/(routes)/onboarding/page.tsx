import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/db/functions";
export default async function Page(){
  console.log("Called");
  const currUser = await currentUser();
  if(!currUser){
    return redirect("/sign-in");
  }
  await createUser({
    email: currUser.emailAddresses[0].emailAddress,
    firstName: currUser.firstName ?? 'Jane',
    lastName: currUser.lastName ?? "doe",
    clerkID: currUser.id,
  });
  return redirect("/dash");
}