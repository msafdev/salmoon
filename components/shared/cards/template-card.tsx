import Image from "next/image";
import Link from "next/link";

const TemplateCard = ({
  title,
  demo,
  image,
  description,
}: {
  title: string;
  demo: string;
  image: string;
  description: string;
}) => {
  return (
    <Link
      href={demo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Go to ${title} demo`}
      className="group/card w-full space-y-2"
      prefetch={false}
    >
      <div className="relative aspect-video w-auto overflow-hidden rounded bg-muted">
        <Image
          src={image}
          alt={`Thumbnail for ${title}`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 70vw, 50vw"
          className="anim object-cover group-hover/card:scale-105"
        />
      </div>

      <div className="space-y-0.5">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-pretty text-sm font-medium text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default TemplateCard;
