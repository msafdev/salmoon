import { LoaderText } from "@/components/lab/loader";

export const TextLoader = () => {
  return (
    <div className="space-y-4">
      <div className="grid place-items-center gap-1">
        <LoaderText variant="shimmer" className="h-5 w-24" />
        <p className="text-xs font-medium">Shimmer</p>
      </div>
      <div className="grid place-items-center gap-1">
        <LoaderText variant="wave">Generating...</LoaderText>
        <p className="text-xs font-medium">Wave</p>
      </div>
      <div className="grid place-items-center gap-1">
        <LoaderText variant="blink">Generating...</LoaderText>
        <p className="text-xs font-medium">Blink</p>
      </div>
      <div className="grid place-items-center gap-1">
        <LoaderText variant="text-shimmer">Generating...</LoaderText>
        <p className="text-xs font-medium">Text Shimmer</p>
      </div>
    </div>
  );
};
