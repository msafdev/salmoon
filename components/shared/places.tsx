"use client";

import { Transition, motion } from "motion/react";

import { PiXBold } from "react-icons/pi";

import { useMemo } from "react";

import Image from "next/image";

import {
  MorphDialog,
  MorphDialogClose,
  MorphDialogContainer,
  MorphDialogContent,
  MorphDialogImage,
  MorphDialogTrigger,
} from "@/components/motion/morph-dialog";

import { useDesktop } from "@/hooks/use-desktop";
import { placeItems } from "@/lib/constants";

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

const sharedImageClass =
  "aspect-square rounded-lg border-2 bg-border object-cover text-transparent shadow-md";

const Places = () => {
  const { isDesktop, isMounted } = useDesktop(640);

  const itemsToRender = useMemo(() => {
    if (!isMounted) return [];
    return isDesktop ? placeItems : placeItems.slice(1, 4);
  }, [isDesktop, isMounted]);

  const RenderedCard = isDesktop ? PlaceCard : MobilePlaceCard;

  return (
    <div className="relative mt-4 w-full max-w-full">
      <div className="mx-auto flex w-fit flex-row items-center gap-4 -space-x-8 overflow-visible px-4">
        {itemsToRender.map((item) => (
          <RenderedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const MobilePlaceCard = ({ item }: { item: (typeof placeItems)[number] }) => (
  <div style={{ rotate: `${item.rotation}deg` }} className="flex-shrink-0">
    <div
      className={`${sharedImageClass} relative w-[26vw] min-w-16 max-w-28 overflow-hidden xs:w-32`}
    >
      <Image
        src={item.src}
        alt={`Image of place ${item.id}`}
        fill
        quality={75}
        loading="lazy"
        sizes="(max-width: 768px) 30vw"
      />
    </div>
  </div>
);

const PlaceCard = ({ item }: { item: (typeof placeItems)[number] }) => (
  <motion.div
    initial={{ rotate: item.rotation }}
    whileHover={{ rotate: 0, scale: 1.05 }}
    transition={transition as Transition}
    className="flex-shrink-0"
  >
    <MorphDialog>
      <MorphDialogTrigger>
        <MorphDialogImage
          src={item.src}
          alt={`Image of place ${item.id}`}
          className={`${sharedImageClass} w-32`}
        />
      </MorphDialogTrigger>
      <MorphDialogContainer>
        <MorphDialogContent className="relative">
          <MorphDialogImage
            src={item.src}
            alt={`Image of place ${item.id}`}
            className="h-auto w-[90vw] max-w-[300px] rounded-lg object-cover md:max-w-[60vw] lg:h-[70vh] lg:w-auto"
          />
        </MorphDialogContent>
        <MorphDialogClose className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1">
          <PiXBold className="h-5 w-5 text-zinc-500" />
        </MorphDialogClose>
      </MorphDialogContainer>
    </MorphDialog>
  </motion.div>
);

export default Places;
