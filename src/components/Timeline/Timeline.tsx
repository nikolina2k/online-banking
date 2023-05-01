import React from "react";
import TimelineItem, { Operation } from "../TimelineItem/TimelineItem";

interface TimelineProps {
  items: Operation[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  items = items ?? [];
  return (
    <div className="timeline">
      {items.map((item) => (
        <TimelineItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Timeline;
