"use client";

import { AnimatePresence, motion } from "motion/react";

import { ReactNode, useContext, useEffect, useRef } from "react";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";

function FrozenRoute({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozenContext = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

interface PageTransitionProps {
  children: ReactNode;
}

const excludedPaths = ["/bucket-list"];

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldSkip = excludedPaths.includes(pathname);

  if (shouldSkip) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex w-full flex-col"
      >
        <ScrollToTop />
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  );
}
