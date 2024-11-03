import Navbar from "@/components/navbar";
import "../globals.css";
import PageSelect from "@/components/page-select";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar/>
        <PageSelect/>
        {children}
    </>
  );
}