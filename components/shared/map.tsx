"use client";

import { X } from "lucide-react";

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

import Semarang from "@/public/assets/semarang.webp";

const Map = () => {
  return (
    <div className="aspect-[5/3] w-full rounded-[16px] border-2 border-dashed p-2">
      <div className="group/map relative h-full w-full overflow-hidden rounded-[8px] bg-muted">
        <Image
          src={Semarang}
          alt="Map of Semarang, Indonesia"
          fill
          className="object-cover transition-transform duration-500 group-hover/map:scale-100 dark:grayscale"
          quality={85}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
        />
        {placeItems.map((item) => (
          <div
            key={item.id}
            style={{ top: item.place.top, left: item.place.left }}
            className="absolute z-10 h-fit w-fit place-items-center"
          >
            <MorphingDialog>
              <MorphingDialogTrigger>
                <MorphingDialogImage
                  src={item.src}
                  alt={`Image of place ${item.id}`}
                  className="aspect-square h-auto w-[8vw] rounded-sm border border-zinc-100 object-cover xs:size-9"
                />
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="relative">
                  <MorphingDialogImage
                    src={item.src}
                    alt={`Image of place ${item.id}`}
                    className="h-auto w-[90vw] max-w-[300px] rounded-[4px] object-cover sm:max-w-[60vw] lg:h-[70vh] lg:w-auto"
                  />
                </MorphingDialogContent>
                <MorphingDialogClose className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1">
                  <X className="h-5 w-5 text-zinc-500" />
                </MorphingDialogClose>
              </MorphingDialogContainer>
            </MorphingDialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
