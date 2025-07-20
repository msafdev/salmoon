import { Caveat } from "next/font/google";

import { cn } from "@/lib/utils";

const caveat = Caveat({
  subsets: ["latin-ext"],
  display: "swap",
  weight: ["500"],
  variable: "--font-caveat",
});

const Scribble = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span className={cn("font-caveat", caveat.variable, className)}>
      {children}
    </span>
  );
};

export default Scribble;
