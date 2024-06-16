import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/nav/navbar";
import Footer from "@/components/nav/footer";

import NotFound from "./not-found";

import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <main className="flex flex-col min-h-[100svh] w-full gap-y-16 md:gap-y-20 lg:gap-y-24">
          <Navbar />
          {children}
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
