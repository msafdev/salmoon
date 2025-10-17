import Image from "next/image";

const MovieCard = ({ title, url }: { title: string; url: string }) => {
  return (
    <div className="group flex w-full flex-col gap-y-1.5">
      <div className="relative aspect-video w-full overflow-hidden rounded-[2px] transform-gpu transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-1">
        <Image
          src={url}
          alt={title}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <h3 className="text-foreground text-sm leading-none font-semibold sm:text-sm sm:leading-none">
        {title}
      </h3>
    </div>
  );
};

export default MovieCard;
