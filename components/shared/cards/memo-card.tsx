"use client";

import { Variants, motion } from "motion/react";
import { useMediaQuery } from "usehooks-ts";

import Image from "next/image";

import Scribble from "@/components/shared/scribble";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 10,
  mass: 0.8,
};

const containerVariant = {
  rest: {
    rotate: -2,
    skewX: 2,
    scale: 1,
    transition: spring,
  },
  hover: {
    rotate: 0,
    skewX: 0,
    scale: 1.05,
    transition: spring,
  },
  "hover-mobile": {
    rotate: 0,
    skewX: 0,
    scale: 1,
    transition: spring,
  },
} as Variants;

const maskVariant = {
  rest: {
    x: -12,
    y: 12,
    scale: 1,
    transition: spring,
  },
  hover: {
    x: 0,
    y: 16,
    scale: 0.95,
    transition: spring,
  },
  "hover-mobile": {
    x: 0,
    y: 16,
    scale: 0.95,
    transition: spring,
  },
} as Variants;

const MemoCard = () => {
  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      className="relative w-full max-w-md cursor-pointer"
      initial="rest"
      animate={matches ? "hover-mobile" : "rest"}
      whileHover={matches ? "hover-mobile" : "hover"}
      variants={containerVariant}
    >
      {/* Shadow Layer */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden rounded-[4px]"
        variants={maskVariant}
      >
        <Image
          src="/assets/grain.webp"
          alt="grain texture"
          fill
          className="object-cover opacity-10 dark:opacity-10 dark:invert"
          priority={false}
          quality={60}
          loading="lazy"
          unoptimized
        />
      </motion.div>

      {/* Memo Card */}
      <div className="space-y-6 rounded-[4px] border bg-card p-6 text-card-foreground shadow-none md:space-y-8 md:p-8">
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-lg font-bold">Founder's Memo</h3>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            I am only human, and I recognize that I can make mistakes. Some of
            the information here might become outdated or incomplete over time.
          </p>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            If you ever notice errors, inconsistencies, or ways to improve these
            materials, please don't hesitate to reach out or contribute your
            insights, your feedback is invaluable.
          </p>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            From the bottom of my heart, thank you for your support, your trust,
            and for being part of this journey.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Scribble className="-rotate-3 text-center leading-none">
            With love, <br />
            Salman
          </Scribble>
          <div className="flex items-center gap-x-2">
            <Avatar className="size-8">
              <AvatarImage
                src="/assets/ava.webp"
                alt="Salman's avatar image."
                loading="lazy"
              />
              <AvatarFallback className="size-8">MS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
              <p className="text-sm font-semibold leading-none">
                Salman Alfarisi
              </p>
              <span className="text-xs leading-none text-muted-foreground">
                Founder of Oddin
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoCard;
