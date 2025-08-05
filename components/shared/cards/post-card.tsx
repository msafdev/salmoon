import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/functions";
import { cn } from "@/lib/utils";

const PostCard = ({
  title,
  slug,
  image,
  date,
  className,
}: {
  title: string;
  slug: string;
  image: string;
  date: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/${slug}`}
      className={cn("group/blog w-full space-y-1.5", className)}
    >
      <div className="bg-muted relative aspect-video w-auto overflow-hidden rounded-[2px]">
        <Image
          src={image}
          alt={`Thumbnail of ${title}`}
          fill
          loading="lazy"
          quality={80}
          sizes="(max-width: 440px) 60vw, (max-width: 768px) 80vw, 60vw"
          className="anim scale-105 object-cover group-hover/blog:scale-110"
        />
      </div>
      <div className="space-y-0.5">
        <h3 className="text-foreground line-clamp-1 text-base font-semibold">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs font-medium text-pretty sm:text-sm">
          {formatDate(date, "long")}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
