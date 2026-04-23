"use client";

import { ReactNode, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
