import { Badge } from "@/components/ui/badge";

export const BasicBadge = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge className="h-6">Default</Badge>
      <Badge className="h-6" variant="secondary">
        Secondary
      </Badge>
      <Badge className="h-6" variant="outline">
        Outline
      </Badge>
    </div>
  );
};
