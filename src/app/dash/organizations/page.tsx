import { getUserOrgs } from "@/db/functions"
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page(){
  const { userId} = await auth();
  const userOrgs = await getUserOrgs(userId!);
  return (
    <div className="w-screen h-[100dvh]">
      <h1 className="font-black w-full text-center text-5xl">Organizations</h1>
      <div className="w-full flex flex-col flex-1 items-center justify-center">
        {userOrgs.length > 0 ? (
          userOrgs.map((org) => {
            return (
              // <div className="text-lg">{org.profileUrl}</div>
              <Link href={`/dash/organizations/${org.orgID}`} className="h-20">
                <div className="text-2xl border-b">{org.orgs.orgName}</div>
              </Link>
            );
          })
        ) : (
          <div className="text-2xl m-2 p-2">No Organizations</div>
        )}
        <Link href="/dash/organizations/new" className="cursor-pointer">
          <Button className="font-semibold text-lg">New Org</Button>
        </Link>
      </div>
    </div>
  );

}