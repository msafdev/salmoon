"use client";

import { MotionValue, motion, useSpring, useTransform } from "motion/react";

import { PiMinusBold, PiPlusBold } from "react-icons/pi";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const Number = ({ mv, number }: { mv: MotionValue; number: number }) => {
  const y = useTransform(mv, (latest) => {
    const height = 32;
    const offset = (10 + number - (latest % 10)) % 10;
    return (offset > 5 ? offset - 10 : offset) * height;
  });

  const scale = useTransform(y, (y) => {
    const absY = Math.abs(y);
    return absY > 160 ? 0.5 : absY < 96 ? 1 : 1 - ((absY - 96) / 64) * 0.5;
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

const Container = ({ value, place }: { value: number; place: number }) => {
  const digit = Math.floor(value / place) % 10;
  const animatedValue = useSpring(digit);
  useEffect(() => animatedValue.set(digit), [animatedValue, digit]);

  return (
    <div className="relative size-8">
      {Array.from({ length: 10 }, (_, index) => (
        <Number mv={animatedValue} number={index} key={index} />
      ))}
    </div>
  );
};

const ClassicCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-full w-full items-center justify-center gap-x-4 overflow-hidden">
      <Button
        variant="secondary"
        size="icon"
        className="size-7 rounded-full p-1.5"
        onClick={() => count > 0 && count < 999 && setCount(count - 1)}
        aria-label="Decrement counter"
      >
        <PiMinusBold />
      </Button>
      <div className="relative flex h-24 items-center overflow-hidden">
        {[100, 10, 1].map((place) => (
          <Container value={count} place={place} key={place} />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="size-7 rounded-full p-1.5"
        onClick={() => setCount(count + 1)}
        aria-label="Increment counter"
      >
        <PiPlusBold />
      </Button>
    </div>
  );
};

export default ClassicCounter;
