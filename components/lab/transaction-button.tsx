"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";

import { useEffect, useState } from "react";

const TransactionButton = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prevLoading) => !prevLoading);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const icon = loading ? (
    <LoaderCircle size={14} className="animate-spin" />
  ) : (
    <Check size={14} />
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
      className="flex items-center gap-x-2 rounded-full px-3 text-sm font-medium overflow-hidden h-8"
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
