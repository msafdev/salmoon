import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Footer from "@/components/nav/footer";

import NotFound from "./not-found";

import { Toaster } from "@/components/ui/toaster";
import Dock from "@/components/nav/dock";
import { ThemeProvider } from "@/components/shared/theme-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex flex-col min-h-[100svh] items-center justify-center">
            <div className="fixed top-0 left-0 w-full h-16 pointer-events-none md:h-20 lg:h-24 bg-gradient-to-b from-background to-transparent z-50"/>
            <main className="flex flex-col w-full py-16 md:py-20 lg:py-24">
              {children}
            </main>
            <Dock />
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
