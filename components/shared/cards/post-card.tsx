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
      <div className="relative aspect-video w-auto overflow-hidden rounded-[2px] bg-muted">
        <Image
          src={image}
          alt={`Thumbnail of ${title}`}
          fill
          loading="lazy"
          sizes="(max-width: 440px) 50vw, (max-width: 768px) 40vw, 50vw"
          className="anim scale-105 object-cover group-hover/blog:scale-110"
        />
      </div>
      <div className="space-y-0.5">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-pretty text-xs font-medium text-muted-foreground sm:text-sm">
          {formatDate(date, "long")}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
