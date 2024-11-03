import Link from "next/link";

const links = [
    {name: "Chatbots", dest: "/dash/chatbots"},
    {name: "Invites",  dest: "/dash/invites"}
];

const PageSelect = () => {
  return (
    <div className="flex gap-x-10 border-b border-white bg-zinc-950 p-4 pb-2 pt-6">
        {links.map(({name, dest}) => {
            return (
                <Link key={name} href={dest} className="text-xl font-semibold text-white">
                    {name}
                </Link>
            )
        })}
    </div>
  );
};

export default PageSelect;