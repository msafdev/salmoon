import TrackCard from "@/components/shared/cards/track-card";

import { topTracks } from "@/lib/spotify";
import { trackItems } from "@/lib/constants";

const TrackGroup = async () => {
  try {
    const tracks = await topTracks();

    if (!tracks || tracks.length === 0) {
      return (
        <div className="flex w-full flex-col gap-y-4">
          {trackItems.map((track) => (
            <TrackCard key={track.id} track={track as any} />
          ))}
        </div>
      );
    }

    return (
      <div className="flex w-full flex-col gap-y-4">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="flex w-full flex-col gap-y-4">
        {trackItems.map((track) => (
          <TrackCard key={track.id} track={track as any} />
        ))}
      </div>
    );
  }
};

export default TrackGroup;
