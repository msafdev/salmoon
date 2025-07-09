import SocialCard, { Name } from "@/components/shared/cards/social-card";
import Paragraph from "@/components/shared/paragraph";

import { socialItems } from "@/lib/constants";

const ActionSection = () => {
  return (
    <div className="space-y-4 w-full">
      <Paragraph title="Let's connect">
        <div className="grid w-full grid-cols-3 flex-wrap items-center gap-2 xs:grid-cols-6">
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
      </Paragraph>
    </div>
  );
};

export default ActionSection;
