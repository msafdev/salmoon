import Link from "next/link";

import { cn } from "@/lib/utils";

const BlogCard = ({
  slug,
  title,
  date,
  className,
}: {
  slug: string;
  title: string;
  date: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/blog/${slug}`}
      target="_blank"
      className={cn(
        "anim group/blog flex w-full flex-col rounded-sm bg-background py-2 text-sm hover:bg-accent hover:pl-3 sm:text-base",
        className,
      )}
    >
      <h3 className="anim line-clamp-1 font-semibold text-foreground group-hover/blog:text-accent-foreground">
        {title}
      </h3>
      <p className="anim line-clamp-1 font-mono text-xs text-muted-foreground">
        {date}
      </p>
    </Link>
  );
};

export default BlogCard;
