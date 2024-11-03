import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../components/theme-provider"
import { MyRuntimeProvider } from "./MyRuntimeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OrgSage",
  description: "Your organization's best friend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <MyRuntimeProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="shortcut icon" href ="images/favicon.ico"/>
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="flex flex-col w-screen h-screen bg-gradient-to-r from-[#1B1919] to-[#090909]">
                {children}
              </main>
            </ThemeProvider>
          </body>
        </html>
        </MyRuntimeProvider>
      </ClerkProvider>
  );
}