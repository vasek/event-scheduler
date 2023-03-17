import React from "react";
import { Event, getEmptySlot, getMaxOverlap } from "../utils";
import { TimelineEvent } from "./TimelineEvent";

interface ClusterProps {
  cluster: Event[];
  onRemoveEvent: (id: number) => void;
}

export const Cluster: React.FC<ClusterProps> = ({ cluster, onRemoveEvent }) => {
  const maxOverlap = getMaxOverlap(cluster);
  const width = 100 / maxOverlap;

  const positionedEvents: (Event & { position: number })[] = [];

  for (const event of cluster) {
    const position = getEmptySlot(positionedEvents, event);

    if (position >= 0) {
      positionedEvents.push({ ...event, position });
    }
  }

  return (
    <>
      {positionedEvents.map((event) => (
        <TimelineEvent
          key={event.id}
          event={event}
          width={width}
          left={event.position * width}
          onRemoveEvent={onRemoveEvent}
        />
      ))}
    </>
  );
};
