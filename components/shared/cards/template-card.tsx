import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const TemplateCard = ({
  title,
  demo,
  image,
  description,
}: {
  title: string;
  demo: string;
  image: StaticImageData;
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
          placeholder="blur"
          sizes="(max-width: 440px) 50vw, (max-width: 768px) 40vw, 50vw"
          className="anim object-cover group-hover/card:scale-105"
        />
      </div>

      <div className="space-y-0.5">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">
          {title}
        </h3>
        <p className="hidden text-pretty text-sm font-medium text-muted-foreground xs:block">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default TemplateCard;
