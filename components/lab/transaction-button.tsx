"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";
import { PiArrowClockwiseBold, PiCheckBold } from "react-icons/pi";

const TransactionButton = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prevLoading) => !prevLoading);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const icon = loading ? (
    <PiArrowClockwiseBold size={14} className="animate-spin" />
  ) : (
    <PiCheckBold size={14} />
  );
  const label = loading ? "Processing transaction" : "Transaction successful";

  return (
    <motion.button
      disabled={loading}
      style={{
        backgroundColor: loading
          ? "rgb(77, 175, 255, 0.1)"
          : "rgb(52, 199, 89, 0.15)",
        cursor: loading ? "not-allowed" : "pointer",
        color: loading ? "#4DAFFF" : "#34C759",
      }}
      layout="position"
      className="flex h-8 items-center gap-x-2 overflow-hidden rounded-full px-3 text-sm font-medium"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={loading ? "loading-icon" : "success-icon"}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.6,
          }}
        >
          {icon}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={loading ? "loading-label" : "success-label"}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.6,
          }}
          className="truncate"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default TransactionButton;
