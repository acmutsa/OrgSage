import { Button } from "@/components/ui/button";
import Navbar from "../components/navbar";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col text-white">
      <Navbar/>
      <div className="mt-10 flex flex-grow flex-col items-center gap-y-6 p-8">
        <div className="flex flex-col items-center gap-y-2">
            <h2 className="text-center text-4xl font-bold">Welcome to OrgSage</h2>
            <p className="text-center text-lg text-white">
            OrgSage is your single source of truth for organizational knowledge.
            </p>
        </div>
        <Link href="/dash">
            <Button>
                Get Started
            </Button>
        </Link>
      </div>
  </div>
  );
}