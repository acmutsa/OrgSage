import { UserButton } from "@clerk/nextjs";
import { CircleUserRound } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Logo from "./home-logo";

const Navbar = () => {
  return (
    <div className="border-b border-white bg-zinc-950 flex justify-between py-3 px-4">
      <div className="flex items-center gap-x-3">
        <Logo/>
        <span className="text-white text-2xl font-semibold">OrgSage</span>
      </div>
      
      <div className="ml-auto flex items-center p-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="flex items-center rounded-full bg-black border border-white px-4 py-2 text-white font-medium cursor-pointer hover:opacity-75">
              <CircleUserRound className="h-5 w-5" />
              <span className="ml-2 sm:block whitespace-nowrap">Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>
      </div>

    </div>
  );
};

export default Navbar;