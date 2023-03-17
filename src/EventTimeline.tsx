import React from "react";
import { Cluster } from "./components/Cluster";
import { computeClusters, Event } from "./utils";

interface EventTimelineProps {
  events: Event[];
  onRemoveEvent: (id: number) => void;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({
  events,
  onRemoveEvent,
}) => {
  const clusters = computeClusters(events);

  return (
    <div className="relative h-[1000px] bg-gray-200 rounded-lg p-2">
      {clusters.map((cluster, index) => (
        <Cluster key={index} cluster={cluster} onRemoveEvent={onRemoveEvent} />
      ))}
    </div>
  );
};
