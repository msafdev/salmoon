import { Asterisk } from "lucide-react";

import { Tilt } from "@/components/ui/tilt";

const CreditCard = () => {
  return (
    <Tilt
      rotationFactor={6}
      isRevese
      style={{
        transformOrigin: "center center",
      }}
      springOptions={{
        stiffness: 12.7,
        damping: 1.1,
        mass: 0.4,
      }}
      className="flex aspect-[1.586/1] w-full max-w-64 cursor-default flex-col rounded-lg bg-gradient-to-br from-zinc-700 from-20% via-rose-500 via-80% to-orange-400 p-3 shadow-sm dark:from-zinc-200 dark:via-violet-500 dark:to-purple-800"
    >
      <div className="flex w-full items-center justify-between">
        <Asterisk className="size-5 text-orange-600 text-primary-foreground dark:text-violet-600" />
        <Visa />
      </div>

      <div className="mt-auto flex gap-x-4 text-lg font-bold text-primary-foreground">
        <span>2143</span>
        <span>****</span>
        <span>****</span>
        <span>3291</span>
      </div>
      <div className="mt-1 flex items-center gap-x-8">
        <p className="text-xs font-semibold text-primary-foreground/80">
          John D.
        </p>
        <p className="text-xs font-semibold text-primary-foreground/80">
          09/25
        </p>
      </div>
    </Tilt>
  );
};

const Visa = () => {
  return (
    <svg
      width="63"
      height="20"
      viewBox="0 0 63 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-fit w-11"
    >
      <path
        d="M22.3701 19.0485L25.5532 0.374744H30.6428L27.4587 19.0485H22.3701ZM45.8238 0.784405C44.3632 0.255318 42.8203 -0.0101722 41.2669 0.000298022C36.244 0.000298022 32.7055 2.52987 32.675 6.15602C32.6474 8.83609 35.2017 10.3309 37.13 11.2227C39.1089 12.1373 39.7739 12.7204 39.7644 13.5369C39.752 14.7869 38.1838 15.3576 36.7232 15.3576C34.6882 15.3576 33.6077 15.0718 31.9375 14.3792L31.283 14.0828L30.5694 18.2578C31.7565 18.778 33.9526 19.2296 36.2316 19.2524C41.5755 19.2524 45.0445 16.7524 45.0845 12.8805C45.1036 10.7587 43.7507 9.14379 40.8162 7.81281C39.0393 6.95534 37.9513 6.37416 37.9627 5.50049C37.9627 4.72591 38.884 3.89706 40.8743 3.89706C42.1783 3.86787 43.4741 4.11125 44.6786 4.61162L45.134 4.82692L45.8238 0.784405ZM58.8993 0.374744H54.9835C53.7707 0.374744 52.8627 0.706316 52.3301 1.9163L44.8034 18.9533H50.1607C50.1607 18.9533 51.0182 16.6876 51.2154 16.1903L57.6341 16.1979C57.7837 16.842 58.2438 18.9533 58.2438 18.9533H62.9999L58.8993 0.374744ZM52.6731 12.3793C53.0933 11.3046 54.6987 7.16589 54.6987 7.16589C54.6682 7.21543 55.116 6.08548 55.3722 5.38522L55.7162 6.99348C55.7162 6.99348 56.6899 11.4456 56.8928 12.3793H52.6731ZM18.0513 0.374744L13.0856 13.0644L12.5568 10.4853C11.6327 7.51272 8.7525 4.29245 5.53223 2.68041L10.073 18.9533L15.4389 18.9475L23.4238 0.374744H18.0265"
        fill="hsl(var(--primary-foreground))"
      />
      <path
        d="M8.22789 0.37442H0.0657338L0 0.762171C6.37768 2.30657 10.5973 6.03753 12.3494 10.5192L10.5669 1.94454C10.2591 0.764091 9.36739 0.411574 8.26316 0.370605"
        fill="hsl(var(--primary-foreground))"
      />
    </svg>
  );
};

export default CreditCard;
