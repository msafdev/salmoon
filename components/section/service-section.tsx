import { Component, Terminal } from "lucide-react";

import ServiceCard from "../shared/service-card";
import ProfileSection from "./profile-section";

const ServiceSection = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5 md:gap-2">
      <ProfileSection />
      <div className="grid w-full grid-cols-2 gap-1.5 md:gap-2">
        <ServiceCard
          title="Development"
          description="Fast, reliable, and interactive product."
          icon={Terminal}
        />
        <ServiceCard
          title="Design"
          description="Modern, clean, and user-friendly design."
          icon={Component}
        />
      </div>
    </div>
  );
};
export default ServiceSection;
