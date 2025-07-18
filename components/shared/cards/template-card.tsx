import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/shared/icon";

import { Badge } from "@/components/ui/badge";

const TemplateCard = ({
  title,
  tags,
  types,
  demo,
  image,
}: {
  title: string;
  image: string;
  tags: string[];
  types: string[];
  demo: string;
}) => {
  return (
    <Link
      href={demo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Go to ${title} demo`}
      className="group/card relative flex w-full flex-col gap-x-3 gap-y-2 overflow-hidden sm:flex-row"
    >
      <div className="relative aspect-video w-auto overflow-hidden rounded bg-muted">
        <Image
          src={image}
          alt={`Thumbnail for ${title}`}
          fill
          className="anim object-cover grayscale group-hover/card:scale-105 group-hover/card:grayscale-0"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">{title}</h3>

        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Badge
              key={type}
              className="flex h-6 items-center gap-2 border px-2 py-1 font-medium capitalize"
              variant="secondary"
            >
              <Icon name={type} />
              {type}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="flex h-6 items-center gap-2 border px-2 py-1 font-medium capitalize"
              variant="secondary"
            >
              <Icon name={tag} type="tech" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="absolute bottom-0 right-0" />
      </div>
    </Link>
  );
};

export default TemplateCard;
