import Navbar from "../../components/navbar";


export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col text-white p-3">
      <div className="justify-between">
        <Navbar/>
      </div>
      <h2 className="text-4xl font-bold text-sage-800 pt-20">Welcome to OrgSage</h2>
      <p className="text-lg text-white">
        OrgSage is your single source of truth for organizational knowledge.
      </p>
  </div>
  );
}
