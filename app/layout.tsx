import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import Dock from "@/components/shared/dock";

import { Toaster } from "@/components/ui/sonner";

import QueryProvider from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

import { siteItems } from "@/lib/config";
import "@/styles/globals.css";

import NotFound from "./not-found";

const Footer = dynamic(() => import("@/components/shared/footer"), {
  ssr: false,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta-plus",
});

export const metadata: Metadata = {
  metadataBase: siteItems.url ? new URL(siteItems.url) : undefined,
  applicationName: siteItems.appName,
  title: {
    default: siteItems.title,
    template: "Msafdev | %s",
  },
  keywords: [
    "muhammad salman alfarisi",
    "msafdev",
    "msaf",
    "salmoon",
    "salman alfarisi",
    "fullstack developer",
    "product engineer",
    "UI/UX",
    "frontend",
    "backend",
    "react developer",
    "nextjs developer",
    "freelance developer",
    "web developer indonesia",
    "portfolio developer",
    "hire fullstack developer",
    "design engineer",
    "indonesia",
    "software engineer portfolio",
  ],
  verification: {
    google: "o2JC_24yWCXt25B4cLk_3kF-RTSQDBNab7JNqh33cHU",
  },
  icons: {
    icon: `/favicon.ico`,
  },
  description: siteItems.description,
  openGraph: {
    title: "Msafdev | Product Engineer",
    url: siteItems.url,
    siteName: "Msafdev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteItems.url}/api/og`,
        alt: "Msafdev",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Msafdev | Product Engineer",
    images: [`${siteItems.url}/api/og`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} antialiased`}>
      <body className="font-jakarta-plus">
        <ThemeProvider
          attribute="class"
          enableColorScheme={false}
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              easing="ease"
              speed={300}
              showSpinner={false}
              height={2}
              shadow="0 0 20px #2299DD, 0 0 10px #2299DD"
              zIndex={100}
            />

            <div className="relative flex min-h-svh flex-col items-center justify-center">
              <div className="from-background pointer-events-none fixed top-0 left-0 z-50 h-8 w-full bg-linear-to-b to-transparent md:h-10 lg:h-12" />
              <main className="flex h-auto w-full grow flex-col py-16 md:py-20 lg:py-24">
                {children}
              </main>
              <Dock />
            </div>
          </QueryProvider>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
