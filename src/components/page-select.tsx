import Link from "next/link";

const links = ["Chatbots", "Invites"]

const PageSelect = () => {
  return (
    <div className="flex gap-x-10 border-b border-white bg-zinc-950 p-4 pb-2 pt-6">
        {links.map((linkName) => {
            return (
                <Link key={linkName} href={linkName.toLocaleLowerCase()} className="text-xl font-semibold text-white">
                    {linkName}
                </Link>
            )
        })}
    </div>
  );
};

export default PageSelect;