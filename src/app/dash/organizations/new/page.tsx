'use client'
import { createOrganizationAction } from "@/app/actions/organization";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
export default function Page(){
  const [isLoading,setIsLoading] = useState(false);
  const [orgName,setOrgName] = useState("");
  
  const handleChange = (event:any) => {
    setOrgName(event.target.value);
  };
  return (
    <div className="w-screen h-[100dvh]">
      <div className="flex flex-col flex-1 w-full items-center justify-center space-y-4">
        <h1 className="font-black w-full text-center text-5xl pt-4">
          New Organization
        </h1>
        <div className="flex flex-col items-center justify-center space-y-4 p-10 border rounded-md">
          <Input type="text" value={orgName} onChange={handleChange} />
          <Button
            onClick={async () => {
              if (!orgName) return;
              const res = await createOrganizationAction({
                orgName,
              });
            }}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}