"use client";

import { useState, useEffect } from "react";

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
    <div className="flex w-full items-center rounded-full overflow-hidden max-w-xs border">
      <div
        className="bg-gradient-to-b from-background border-r to-accent transition-all duration-300 ease-in-out"
        style={{
          width: `${percentage}%`,
          height: "24px",
        }}
      />
    </div>
  );
};

export default LoadingBar;
