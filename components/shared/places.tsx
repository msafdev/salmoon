"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

import { memo } from "react";

import Image from "next/image";

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "@/components/motion/morph-dialog";

import { placeItems } from "@/lib/constants";
import { useIsDesktop } from "@/lib/hooks";

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

const sharedImageClass =
  "aspect-square rounded-lg border-2 bg-border object-cover text-transparent shadow-md dark:border-border";

const MobilePlaceCard = memo(
  ({ item }: { item: (typeof placeItems)[number] }) => (
    <div style={{ rotate: `${item.rotation}deg` }} className="flex-shrink-0">
      <div
        className={`${sharedImageClass} relative w-[24vw] min-w-16 max-w-24 overflow-hidden xs:w-28`}
      >
        <Image
          src={item.src}
          alt={`Image of place ${item.id}`}
          fill
          quality={70}
          loading="lazy"
        />
      </div>
    </div>
  ),
);

const PlaceCard = memo(({ item }: { item: (typeof placeItems)[number] }) => (
  <motion.div
    initial={{ rotate: item.rotation }}
    whileHover={{ rotate: 0, scale: 1.05 }}
    transition={transition}
    className="flex-shrink-0"
  >
    <MorphingDialog>
      <MorphingDialogTrigger>
        <MorphingDialogImage
          src={item.src}
          alt={`Image of place ${item.id}`}
          className={`${sharedImageClass} w-32`}
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative">
          <MorphingDialogImage
            src={item.src}
            alt={`Image of place ${item.id}`}
            className="h-auto w-[90vw] max-w-[300px] rounded-lg object-cover md:max-w-[60vw] lg:h-[70vh] lg:w-auto"
          />
        </MorphingDialogContent>
        <MorphingDialogClose className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1">
          <X className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  </motion.div>
));

const Places = () => {
  const { isDesktop, isMounted } = useIsDesktop(640);
  if (!isMounted) return null;

  const RenderedCard = isDesktop ? PlaceCard : MobilePlaceCard;

  return (
    <div className="relative mt-4 w-full max-w-full">
      <div className="mx-auto flex w-fit flex-row items-center gap-4 -space-x-8 overflow-visible px-4">
        {placeItems.map((item) => (
          <RenderedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Places;
