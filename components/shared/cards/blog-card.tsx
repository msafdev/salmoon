import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/functions";

const BlogCard = ({
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
      className={cn(
        "anim group/blog grid w-full grid-cols-2 gap-2 text-sm sm:text-sm",
        className,
      )}
    >
      <div className="relative col-span-full aspect-[8/5] h-auto w-full overflow-hidden rounded bg-muted">
        <Image
          src={image}
          alt={`Thumbnail of ${title}`}
          fill
          className="anim scale-105 object-cover group-hover/blog:scale-110"
        />
      </div>
      <div className="col-span-full flex h-full flex-col justify-center gap-0.5">
        <h3 className="anim line-clamp-1 font-semibold text-foreground group-hover/blog:text-accent-foreground">
          {title}
        </h3>
        <p className="anim text-xs font-medium text-muted-foreground">
          {formatDate(date, "long")}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
