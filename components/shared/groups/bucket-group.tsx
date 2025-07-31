import BucketCard from "@/components/shared/cards/bucket-card";

import { bucketItems } from "@/lib/constants";

const BucketGroup = () => {
  const sortedItems = bucketItems.sort(
    (a, b) => Number(b.done) - Number(a.done),
  );

  return (
    <div className="flex w-full flex-col gap-y-4">
      {sortedItems.map((item, index) => (
        <BucketCard key={index} index={index} {...item} />
      ))}
    </div>
  );
};

export default BucketGroup;
