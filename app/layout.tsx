import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import Dock from "@/components/shared/dock";
import Footer from "@/components/shared/footer";
import { ThemeProvider } from "@/components/shared/theme-provider";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import NotFound from "./not-found";
import { baseUrl } from "./sitemap";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Msafdev | Fullstack Developer",
    template: "Msafdev | %s",
  },
  verification: {
    google: "o2JC_24yWCXt25B4cLk_3kF-RTSQDBNab7JNqh33cHU",
  },
  icons: {
    icon: `/favicon.ico`,
  },
  description:
    "When creativity meets perfection, you get me. A freelance fullstack developer with a passion for building pretty products.",
  openGraph: {
    title: "Msafdev | Fullstack Developer",
    url: baseUrl,
    siteName: "Msafdev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Msafdev",
    images: [`${baseUrl}/og`],
  },
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
          <div className="relative flex min-h-[100svh] flex-col items-center justify-center">
            <div className="absolute pointer-events-none inset-0 h-full w-full rotate-180 bg-background [background:radial-gradient(175%_175%_at_50%_20%,transparent_40%,#71717a_100%)] dark:[background:radial-gradient(175%_175%_at_50%_20%,transparent_40%,#a1a1aa_100%)]"></div>
            <main className="flex h-auto w-full grow flex-col py-16 md:py-20 lg:py-24">
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
