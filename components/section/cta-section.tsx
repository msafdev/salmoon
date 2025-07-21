import SocialCard, { Name } from "@/components/shared/cards/social-card";
import Paragraph from "@/components/shared/paragraph";

import { socialItems } from "@/lib/constants";

const ActionSection = () => {
  return (
    <div className="w-full space-y-4">
      <Paragraph title="Let's connect" />
      <div className="grid w-full grid-cols-6 gap-2">
        {socialItems.map((item) => (
          <SocialCard
            key={item.name}
            href={item.href}
            target={item.target}
            rel={item.rel}
            icon={item.icon}
            name={item.name as Name}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionSection;
