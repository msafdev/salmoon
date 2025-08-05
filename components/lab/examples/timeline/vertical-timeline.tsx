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

export const VerticalTimeline = () => {
  const value = 1;
  return (
    <Timeline defaultValue={value}>
      {items.map((item) => (
        <TimelineItem key={item.id} step={item.id}>
          <TimelineHeader>
            <TimelineSeparator variant={item.id > value ? "dashed" : "solid"} />
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineIndicator className="text-primary/40 group-data-completed/timeline-item:text-primary-foreground group-data-completed/timeline-item:bg-primary size-5 text-center font-mono text-xs">
              {item.id}
            </TimelineIndicator>
          </TimelineHeader>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
