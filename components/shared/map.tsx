"use client";

import { delay, motion } from "framer-motion";
import { X } from "lucide-react";

import Image from "next/image";

import Semarang from "@/public/assets/semarang.webp";

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "./morph-dialog";

const placeItems = [
  {
    id: 1,
    src: "/images/places/place-1.jpeg",
    place: {
      top: "37%",
      left: "27%",
    },
  },
  {
    id: 2,
    src: "/images/places/place-2.jpeg",
    place: {
      top: "56%",
      left: "38%",
    },
  },
  {
    id: 3,
    src: "/images/places/place-3.jpeg",
    place: {
      top: "64%",
      left: "58%",
    },
  },
];

const Map = () => {
  return (
    <div className="aspect-[5/3] w-full rounded-[16px] border-2 border-dashed p-2">
      <div className="group/map relative h-full w-full overflow-hidden rounded-[8px] bg-muted">
        {/* Background Map */}
        <Image
          src={Semarang}
          alt="Map of Semarang, Indonesia"
          fill
          className="object-cover transition-transform duration-500 group-hover/map:scale-100 dark:grayscale"
          quality={70}
          placeholder="blur"
        />

        {placeItems.map((item) => (
          <motion.div
            key={item.id}
            style={{ top: item.place.top, left: item.place.left }}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            transition={{
              type: "easeInOut",
              stiffness: 200,
              damping: 20,
              duration: 0.3,
              opacity: {
                delay: 0.6,
              },
            }}
            className="absolute z-10 h-fit w-fit place-items-center"
          >
            <MorphingDialog
              transition={{
                duration: 0,
                ease: "easeInOut",
              }}
            >
              <MorphingDialogTrigger>
                <MorphingDialogImage
                  src={item.src}
                  alt={`Image of place ${item.id}`}
                  className="aspect-square w-[10vw] xs:size-12 rounded-lg border border-zinc-100 shadow-sm dark:border-zinc-300"
                />
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="relative">
                  <MorphingDialogImage
                    src={item.src}
                    alt={`Image of place ${item.id}`}
                    className="h-auto w-[90vw] max-w-[300px] sm:max-w-[60vw] lg:w-auto rounded-[4px] object-cover lg:h-[70vh]"
                  />
                </MorphingDialogContent>
                <MorphingDialogClose
                  className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: { delay: 0.3, duration: 0.1 },
                    },
                    exit: { opacity: 0, transition: { duration: 0 } },
                  }}
                >
                  <X className="h-5 w-5 text-zinc-500" />
                </MorphingDialogClose>
              </MorphingDialogContainer>
            </MorphingDialog>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Map;
