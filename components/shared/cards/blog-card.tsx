import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${String(date.getFullYear()).slice(-2)}`;
  return formattedDate;
};

const BlogCard = ({
  title,
  slug,
  url,
  createdAt,
  className,
}: {
  title: string;
  slug: string;
  url: string;
  createdAt: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "anim group/blog grid w-full grid-cols-2 gap-2 text-xs sm:text-sm",
        className,
      )}
    >
      <div className="relative col-span-full aspect-[8/5] h-auto w-full overflow-hidden rounded-sm bg-muted">
        <Image
          src={url}
          alt={`Thumbnail of ${title}`}
          fill
          className="anim scale-100 object-cover group-hover/blog:scale-125"
        />
      </div>
      <div className="col-span-full flex h-full flex-col justify-center">
        <h3 className="anim line-clamp-1 font-semibold text-foreground group-hover/blog:text-accent-foreground">
          {title}
        </h3>
        <p className="anim font-mono text-xs text-muted-foreground">
          {formatDate(createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
