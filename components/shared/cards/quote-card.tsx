"use client";

import { PiInfinityDuotone } from "react-icons/pi";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { quoteItems } from "@/lib/constants";

const QuoteCard = () => {
  const [active, setActive] = useState<number>(0);

  const currentQuote = useMemo(() => quoteItems[active], [active]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % quoteItems.length);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex h-8 w-full items-center justify-between gap-x-4">
        <h2 className="text-sm leading-none font-semibold uppercase">
          Word for word
        </h2>
        <Button
          onClick={handleNext}
          className="size-7"
          variant="ghost"
          size="icon"
          aria-label="Refresh quote"
        >
          <PiInfinityDuotone size={16} />
        </Button>
      </div>
      <blockquote className="flex flex-col gap-y-2 transition-opacity duration-300">
        <p className="text-sm font-medium">{currentQuote.quote}</p>
        <p className="text-muted-foreground text-sm font-medium">
          {currentQuote.author}
        </p>
      </blockquote>
    </div>
  );
};

export default QuoteCard;
