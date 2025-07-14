"use client";

import Stagger from "@/components/lab/stagger";

export const ViewAnimation = () => {
  const initialOffsets = [120, 40, -40, -120];
  const spreadOffsets = [18, 9, -9, -18];
  const rotateOffsets = [-6, -2, 2, 6];
  const yOffsets = [9, 2, 2, 9];

  return (
    <Stagger
      className="flex items-center"
      inView
      once={false}
      margin="-20% 0px -20% 0px"
      staggerDelay={0}
      staggerVariants={{
        child: {
          initial: (custom: number) => ({
            x: initialOffsets[custom],
            y: 0,
            rotate: 0,
            z: custom + 1,
          }),
          animate: (custom: number) => ({
            x: spreadOffsets[custom],
            y: yOffsets[custom],
            rotate: rotateOffsets[custom],
            z: custom + 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 22,
            },
          }),
          exit: (custom: number) => ({
            x: initialOffsets[custom],
            y: 0,
            rotate: 0,
            z: custom + 1,
            transition: {
              type: "spring",
              stiffness: 280,
              damping: 20,
            },
          }),
        },
      }}
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="aspect-[4/3] w-24 rounded border bg-accent dark:border-background/60"
        />
      ))}
    </Stagger>
  );
};
