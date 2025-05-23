import TrackCard from "@/components/shared/cards/track-card";

import { topTracks } from "@/lib/spotify";

const TrackSection = async () => {
  const tracks = await topTracks();

  return (
    <div className="flex w-full flex-col gap-y-4">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
};

export default TrackSection;
