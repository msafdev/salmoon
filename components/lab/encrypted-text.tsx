"use client";

import { useRef } from "react";

const EncryptedText = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.!?@#$%^&*()_+-=<>{}[]|/\\";
  const intervalRefs = useRef<{ [key: string]: number | undefined }>({});

  const onHover = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    const targetElement = event.target as HTMLParagraphElement;
    const originalText = targetElement.dataset.value || "";
    let currentIteration = 0;

    if (intervalRefs.current[originalText])
      clearInterval(intervalRefs.current[originalText]);

    const newIntervalId = window.setInterval(() => {
      const newText = originalText
        .split("")
        .map((char, idx) => {
          if (idx < currentIteration) {
            return originalText[idx];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      targetElement.innerText = newText;

      if (currentIteration >= originalText.length) {
        if (newIntervalId) clearInterval(newIntervalId);
      }

      currentIteration += 1 / 3;
    }, 30);

    intervalRefs.current[originalText] = newIntervalId;
  };

  return (
    <div className="flex flex-col items-center gap-x-3 md:flex-row">
      <p
        data-value="Hello"
        onMouseOver={onHover}
        className="cursor-pointer font-mono text-xl font-medium uppercase text-muted-foreground hover:text-foreground"
      >
        Hello
      </p>
      <p
        data-value="World"
        onMouseOver={onHover}
        className="cursor-pointer font-mono text-xl font-medium uppercase text-muted-foreground hover:text-foreground"
      >
        World
      </p>
    </div>
  );
};

export default EncryptedText;
