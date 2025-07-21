import Image from "next/image";

import Paragraph from "@/components/shared/paragraph";

import { clientItems } from "@/lib/constants";

const ClientSection = () => {
  return (
    <div className="w-full space-y-4">
      <Paragraph title="Trusted by all">
        <p>
          I have been in these fields for{" "}
          <span className="font-medium text-foreground">3 years</span>, working
          with a diverse range of clients across various industries.
        </p>
        <p>
          My dedication to quality, attention to detail, and commitment to
          results have built long-lasting relationships and trust with every
          partner I've collaborated with.
        </p>
      </Paragraph>

      <div className="flex w-full flex-wrap items-center justify-center gap-x-12">
        {clientItems.map((item, index) => (
          <div
            key={index}
            className="dark: relative size-20 grayscale dark:invert"
          >
            <Image
              src={item}
              fill
              alt={`Client's logo ${index}`}
              quality={80}
              loading="lazy"
              placeholder="blur"
              sizes="(max-width: 768px) 44vw, 33vw"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSection;
