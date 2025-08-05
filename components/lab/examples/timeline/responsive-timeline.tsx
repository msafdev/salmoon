"use client";

import { useMediaQuery } from "usehooks-ts";

import { PiCheckCircleDuotone, PiXCircleDuotone } from "react-icons/pi";

import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/lab/timeline";

const items = [
  {
    id: 1,
    date: "Mar 15, 2024",
    title: "Project Kickoff",
  },
  {
    id: 2,
    date: "Mar 22, 2024",
    title: "Design Phase",
  },
  {
    id: 3,
    date: "Apr 13, 2024",
    title: "Development",
  },
];

export const ResponsiveTimeline = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const value = 1;

  return (
    <Timeline
      defaultValue={value}
      orientation={matches ? "horizontal" : "vertical"}
      className="max-w-sm"
    >
      {items.map((item) => (
        <TimelineItem key={item.id} step={item.id}>
          <TimelineHeader>
            <TimelineSeparator variant={item.id > value ? "dashed" : "solid"} />
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineIndicator className="text-primary/40 group-data-completed/timeline-item:text-primary-foreground group-data-completed/timeline-item:bg-primary flex size-5 items-center justify-center">
              {item.id <= value ? (
                <PiCheckCircleDuotone size={12} />
              ) : (
                <PiXCircleDuotone size={12} />
              )}
            </TimelineIndicator>
          </TimelineHeader>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
