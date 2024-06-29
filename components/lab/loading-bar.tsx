"use client";

import { useEffect, useState } from "react";

const LoadingBar = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) return 0;
        const increment = Math.random() * 30;
        const nextValue = prev + increment;
        return nextValue > 100 ? 100 : nextValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full max-w-xs items-center overflow-hidden rounded-full border">
      <div
        className="border-r bg-gradient-to-b from-background to-accent transition-all duration-300 ease-in-out"
        style={{
          width: `${percentage}%`,
          height: "24px",
        }}
      />
    </div>
  );
};

export default LoadingBar;
