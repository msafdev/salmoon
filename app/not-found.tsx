"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [router]);

  // ASCII art split so we can style █ and ═ differently
  const ascii = [
    "██╗  ██╗ ██████╗ ██╗  ██╗",
    "██║  ██║██╔═████╗██║  ██║",
    "███████║██║██╔██║███████║",
    "╚════██║████╔╝██║╚════██║",
    "     ██║╚██████╔╝     ██║",
    "     ╚═╝ ╚═════╝      ╚═╝",
  ];

  const renderAsciiLine = (line: string) => {
    return line.split("").map((char, idx) => {
      if (char === "█") {
        return (
          <span key={idx} className="text-foreground">
            {char}
          </span>
        );
      } else if (
        char === "═" ||
        char === "╚" ||
        char === "╗" ||
        char === "╔" ||
        char === "╝" ||
        char === "║"
      ) {
        return (
          <span key={idx} className="text-foreground/20">
            {char}
          </span>
        );
      }
      return <span key={idx}>{char}</span>;
    });
  };

  return (
    <div className="m-auto grid max-w-xl grid-cols-1 px-4 font-mono text-xs font-medium sm:text-sm">
      {/* LEFT: ASCII ART */}
      <div className="flex flex-col justify-center leading-none whitespace-pre">
        {ascii.map((line, i) => (
          <div key={i}>{renderAsciiLine(line)}</div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
