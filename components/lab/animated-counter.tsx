"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const Number = ({ mv, number }: { mv: MotionValue; number: number }) => {
  const y = useTransform(mv, (latest) => {
    const height = 32;
    const latestValue = latest % 10;
    const offset = (10 + number - latestValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  const scale = useTransform(y, (y) => {
    const minScale = 0.5;
    const maxScale = 1.0;
    const scaleFactor = 0.5;

    const absY = Math.abs(y);

    if (absY > 5 * 32) {
      return minScale;
    } else if (absY < 3 * 32) {
      return maxScale;
    }

    return maxScale - ((absY - 3 * 32) / (2 * 32)) * scaleFactor;
  });

  return (
    <motion.span
      style={{ y, scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
};

const DigitContainer = ({ value, place }: { value: number; place: number }) => {
  const digit = Math.floor(value / place) % 10;
  const animatedValue = useSpring(digit);
  useEffect(() => {
    animatedValue.set(digit);
  }, [animatedValue, digit]);

  return (
    <div className="relative size-8">
      {Array.from(Array(10).keys()).map((index) => (
        <Number mv={animatedValue} number={index} key={index} />
      ))}
    </div>
  );
};

const AnimatedCounter = () => {
  const [count, setCount] = useState(123);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-x-4 overflow-hidden">
      <Button
        variant={"secondary"}
        size={"icon"}
        className="size-7 rounded-full p-1.5"
        onClick={handleIncrement}
        aria-label="Increment counter"
      >
        <Plus />
      </Button>
      <div className="relative flex h-24 items-center overflow-hidden">
        <DigitContainer value={count} place={100} />
        <DigitContainer value={count} place={10} />
        <DigitContainer value={count} place={1} />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <Button
        variant={"secondary"}
        size={"icon"}
        className="size-7 rounded-full p-1.5"
        onClick={handleDecrement}
        aria-label="Decrement counter"
      >
        <Minus />
      </Button>
    </div>
  );
};

export default AnimatedCounter;
