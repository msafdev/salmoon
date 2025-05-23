import "@/styles/globals.css";

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Dock from "@/components/shared/dock";
import Footer from "@/components/shared/footer";

import { Toaster } from "@/components/ui/toaster";

import QueryProvider from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

import NotFound from "./not-found";
import { baseUrl } from "./sitemap";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  applicationName: "Msafdev",
  title: {
    default: "Msafdev | Design Engineer",
    template: "Msafdev | %s",
  },
  keywords: [
    "salmoon",
    "salman",
    "msafdev",
    "msaf",
    "portfolio",
    "design",
    "website",
  ],
  verification: {
    google: "o2JC_24yWCXt25B4cLk_3kF-RTSQDBNab7JNqh33cHU",
  },
  icons: {
    icon: `/favicon.ico`,
  },
  description:
    "When creativity meets perfection, you get me. A freelance design engineer / fullstack developer with a passion for building pretty products.",
  openGraph: {
    title: "Msafdev | Design Engineer",
    url: baseUrl,
    siteName: "Msafdev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og`,
        alt: "Msafdev",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Msafdev | Design Engineer",
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
        <SpeedInsights />
        <Analytics />
        <ThemeProvider
          attribute="class"
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

            <div className="relative flex min-h-[100svh] flex-col items-center justify-center">
              <div className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-full bg-gradient-to-b from-background to-transparent md:h-10 lg:h-12" />
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
