"use client";

import { useState, MouseEvent, useCallback, useRef } from "react";

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const TiltCard = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const divRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 4;
      const rotateY = (centerX - x) / 4;

      setRotate({ x: rotateX, y: rotateY });
      setPosition({ x, y });
    }, 100),
    [],
  );

  const onMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setOpacity(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(0.1);
  }, []);

  return (
    <div
      ref={divRef}
      className="card relative aspect-square h-auto w-1/2 max-w-36 min-w-28 transition-all duration-200 ease-in-out will-change-transform"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${-rotate.x}deg) rotateY(${-rotate.y}deg) scale3d(1, 1, 1)`,
      }}
    >
      <div className="group relative flex h-full w-full select-none items-center justify-center rounded-lg border bg-gradient-to-tr from-popover to-accent">
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-200"
          style={{
            opacity,
            background: `radial-gradient(360px circle at ${position.x}px ${position.y}px, hsla(var(--primary)), transparent 40%)`,
          }}
        />
        <code className="text-md inline-block bg-gradient-to-br from-foreground to-primary bg-clip-text font-medium text-transparent">
          Hover me
        </code>
      </div>
    </div>
  );
};

export default TiltCard;