"use client";

import { useEffect, useState } from "react";

const SevenSegment = ({ value = 0 }: { value?: number }) => {
  const segments: { [key: number]: string[] } = {
    0: ["a", "b", "c", "d", "e", "f"],
    1: ["b", "c"],
    2: ["a", "b", "d", "e", "g"],
    3: ["a", "b", "c", "d", "g"],
    4: ["b", "c", "f", "g"],
    5: ["a", "c", "d", "f", "g"],
    6: ["a", "c", "d", "e", "f", "g"],
    7: ["a", "b", "c"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"],
  };

  const activeSegments = segments[value] || [];
  const isActive = (segment: string) => activeSegments.includes(segment);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="relative flex aspect-square h-auto w-5 flex-col">
        <div
          className={`absolute -top-1 h-1 w-full rounded ${
            isActive("a") ? "bg-primary" : "bg-accent"
          }`}
        />
        <div
          className={`absolute -right-1 h-full w-1 rounded ${
            isActive("b") ? "bg-primary" : "bg-accent"
          }`}
        />
        <div
          className={`absolute -left-1 h-full w-1 rounded ${
            isActive("f") ? "bg-primary" : "bg-accent"
          }`}
        />
      </div>
      <div className="relative flex aspect-square h-auto w-5 flex-col">
        <div
          className={`absolute -top-1 h-1 w-full rounded ${
            isActive("g") ? "bg-primary" : "bg-accent"
          }`}
        />
        <div
          className={`absolute -right-1 h-full w-1 rounded ${
            isActive("c") ? "bg-primary" : "bg-accent"
          }`}
        />
        <div
          className={`absolute -left-1 h-full w-1 rounded ${
            isActive("e") ? "bg-primary" : "bg-accent"
          }`}
        />
        <div
          className={`absolute -bottom-1 h-1 w-full rounded ${
            isActive("d") ? "bg-primary" : "bg-accent"
          }`}
        />
      </div>
    </div>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: Date) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return hours + minutes;
  };

  const formattedTime = formatTime(time);

  return (
    <div className="flex flex-col gap-x-5 gap-y-5 lg:flex-row lg:items-center">
      <div className="flex items-center gap-x-5">
        <SevenSegment value={parseInt(formattedTime[0])} />
        <SevenSegment value={parseInt(formattedTime[1])} />
      </div>
      <div className="hidden flex-col gap-y-1 lg:flex">
        <div className="h-1 w-1 animate-pulse bg-primary" />
        <div className="h-1 w-1 animate-pulse bg-primary" />
      </div>
      <div className="flex items-center gap-x-5">
        <SevenSegment value={parseInt(formattedTime[2])} />
        <SevenSegment value={parseInt(formattedTime[3])} />
      </div>
    </div>
  );
};

export default DigitalClock;
