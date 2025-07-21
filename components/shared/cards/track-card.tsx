import Image from "next/image";
import Link from "next/link";

import { Track } from "@/types/spotify.types";

const TrackCard = ({ track }: { track: Track }) => {
  return (
    <Link
      href={track.external_urls.spotify}
      aria-label={track.name}
      target="_blank"
      rel="noopener noreferrer"
      key={track.id}
      className="flex items-center gap-x-3"
    >
      <div className="relative size-12 shrink-0 overflow-hidden rounded-sm bg-muted">
        <Image
          src={track.album.images[0].url}
          alt={track.album.name}
          fill
          quality={75}
          sizes="(max-width: 768px) 44vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold">{track.name}</h3>
        <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
          {track.artists[0].name}
        </p>
      </div>
    </Link>
  );
};

export default TrackCard;
