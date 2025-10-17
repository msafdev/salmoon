import BucketCard from "@/components/shared/cards/bucket-card";

import { bucketItems } from "@/lib/constants";

const BucketGroup = () => {
  const sortedItems = [...bucketItems].sort((a, b) => {
    if (a.done !== b.done) {
      return Number(b.done) - Number(a.done);
    }

    if (a.year && b.year) {
      return b.year - a.year;
    }

    if (a.year) {
      return -1;
    }

    if (b.year) {
      return 1;
    }

    return a.title.localeCompare(b.title);
  });

  return (
    <div className="flex w-full flex-col gap-y-2">
      {sortedItems.map((item, index) => (
        <BucketCard key={index} index={index} {...item} />
      ))}
    </div>
  );
};

export default BucketGroup;