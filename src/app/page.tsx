import Navbar from "../components/navbar";


export default function Home() {
  return (
    <div className="flex flex-col text-white">
      <Navbar/>
      <div className="flex-grow p-8 mt-10">
        <h2 className="text-4xl font-bold text-center">Welcome to OrgSage</h2>
        <p className="text-lg text-white text-center">
          OrgSage is your single source of truth for organizational knowledge.
        </p>
      </div>
  </div>
  );
}