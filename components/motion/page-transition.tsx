"use client";

import { AnimatePresence, motion } from "motion/react";

import { ReactNode, useContext, useRef } from "react";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";

function FrozenRoute({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozenContext = useRef(context).current;
  const frozenChildren = useRef(children).current;

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {frozenChildren}
    </LayoutRouterContext.Provider>
  );
}

interface PageTransitionProps {
  children: ReactNode;
}

const excludedPaths = ["/bucket-list"];

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldSkip = excludedPaths.includes(pathname);

  if (shouldSkip) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex w-full grow flex-col overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-auto w-full grow flex-col"
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
