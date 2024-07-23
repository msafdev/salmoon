import Link from "next/link";

import { cn } from "@/lib/utils";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${String(date.getFullYear()).slice(-2)}`;
  return formattedDate;
};

const BlogCard = ({
  slug,
  title,
  updatedAt,
  className,
}: {
  slug: string;
  title: string;
  updatedAt: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "anim group/blog flex w-full flex-col gap-y-0.5 rounded-md bg-background py-2 text-sm hover:bg-accent hover:pl-3 sm:text-base",
        className,
      )}
    >
      <h3 className="anim line-clamp-1 font-semibold text-foreground group-hover/blog:text-accent-foreground">
        {title}
      </h3>
      <p className="anim line-clamp-1 font-mono text-xs text-muted-foreground">
        {formatDate(updatedAt)}
      </p>
    </Link>
  );
};

export default BlogCard;
