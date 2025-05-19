import Image from "next/image";
import Link from "next/link";

import { topTracks } from "@/lib/spotify";

const TrackCard = async () => {
  const tracks = await topTracks();

  return (
    <div className="flex w-full flex-col gap-y-4">
      {tracks.map((track) => (
        <Link
          href={track.external_urls.spotify}
          aria-label={track.name}
          target="_blank"
          rel="noopener noreferrer"
          key={track.id}
          className="flex items-center gap-x-3"
        >
          <div className="relative size-12 shrink-0 overflow-hidden rounded-sm bg-muted md:size-14">
            <Image
              src={track.album.images[0].url}
              alt={track.album.name}
              fill
              sizes="(max-width: 768px) 66vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h3 className="line-clamp-1 text-sm font-semibold">{track.name}</h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {track.artists[0].name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TrackCard;
