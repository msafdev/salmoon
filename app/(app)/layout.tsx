import dynamic from "next/dynamic";
import NextTopLoader from "nextjs-toploader";

import Dock from "@/components/shared/dock";
import Command from "@/components/shared/command";

const Footer = dynamic(() => import("@/components/shared/footer"), {
  ssr: false,
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
      <Footer />
      <Command />
    </>
  );
}
