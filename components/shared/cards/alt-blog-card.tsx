import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

export const altFormatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${String(date.getFullYear()).slice(-2)}`;
};

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
      href={`/blog/${slug}`}
      className={cn(
        "anim group/blog flex w-full items-center justify-between py-1 text-sm sm:text-sm",
        className,
      )}
    >
      <p className="anim hidden font-mono text-sm text-muted-foreground xs:block">
        {formatDate(createdAt)}
      </p>
      <p className="anim block font-mono text-sm text-muted-foreground xs:hidden">
        {altFormatDate(createdAt)}
      </p>
      <h3 className="anim line-clamp-1 pr-0 font-semibold text-foreground group-hover/blog:pr-3">
        {title}
      </h3>
    </Link>
  );
};

export default AltBlogCard;
