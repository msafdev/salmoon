import { Sparkle } from "lucide-react";

const ShiningBadge = () => {
  return (
    <div className="animate-background-shine inline-flex h-fit items-center justify-center gap-x-2 rounded-full border bg-[linear-gradient(110deg,#f4f4f5,45%,#d4d4d8,55%,#f4f4f5)] bg-[length:250%_100%] px-3 py-1.5 text-xs font-medium text-muted-foreground dark:bg-[linear-gradient(110deg,#09090b,45%,#4D4B4B,55%,#09090b)]">
      <Sparkle className="h-3 w-3" />
      Read the docs
    </div>
  );
};

export default ShiningBadge;