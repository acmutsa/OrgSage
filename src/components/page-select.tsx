import Logo from "./home-logo";

const PageSelect = () => {
  return (
    <div className="flex justify-between border-b border-white bg-zinc-950 px-4 py-3">
      <div className="flex items-center gap-x-3">
        <Logo/>
        <span className="text-2xl font-semibold text-white">OrgSage</span>
      </div>
      
      <div className="ml-auto flex items-center p-2">
        <Logo/>
        <span className="text-2xl font-semibold text-white">OrgSage</span>
      </div>

    </div>
  );
};

export default PageSelect;