import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const TemplateCard = ({
  title,
  demo,
  image,
  github,
}: {
  title: string;
  demo?: string;
  github: string;
  image: StaticImageData;
}) => {
  return (
    <Link
      href={demo ? demo : github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Go to ${title} demo`}
      className="group/card w-full space-y-1.5"
      prefetch={false}
    >
      <div className="relative aspect-video w-auto overflow-hidden rounded-[2px] bg-muted">
        <Image
          src={image}
          alt={`Thumbnail for ${title}`}
          fill
          loading="lazy"
          placeholder="blur"
          className="anim object-cover group-hover/card:scale-105"
        />
      </div>

      <h3 className="line-clamp-1 text-base font-semibold text-foreground">
        {title}
      </h3>
    </Link>
  );
};

export default TemplateCard;
