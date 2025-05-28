import Link from "next/link";

import { cn, formatDate } from "@/lib/utils";

const AltBlogCard = ({
  title,
  slug,
  createdAt,
  className,
}: {
  title: string;
  slug: string;
  createdAt: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "anim group/blog flex w-full items-center justify-between py-1.5 text-sm sm:text-sm",
        className,
      )}
    >
      <p className="anim hidden text-sm font-medium text-muted-foreground xs:block">
        {formatDate(createdAt, "long")}
      </p>
      <p className="anim block text-sm font-medium text-muted-foreground xs:hidden">
        {formatDate(createdAt, "short")}
      </p>
      <h3 className="anim line-clamp-1 pr-0 font-semibold text-foreground group-hover/blog:pr-3">
        {title}
      </h3>
    </Link>
  );
};

export default AltBlogCard;
