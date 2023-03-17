export interface Event {
  id: number;
  title: string;
  start: number;
  end: number;
}

export function sortEvents(events: Event[]): Event[] {
  return events.sort((a, b) => a.start - b.start || b.end - a.end);
}

export function computeClusters(events: Event[]) {
  const sortedEvents = sortEvents(events);
  const clusters: Event[][] = [];

  for (const event of sortedEvents) {
    let addedToCluster = false;

    for (const cluster of clusters) {
      if (
        cluster.some((clusterEvent) =>
          areEventsOverlapping(clusterEvent, event)
        )
      ) {
        cluster.push(event);
        addedToCluster = true;
        break;
      }
    }

    if (!addedToCluster) {
      clusters.push([event]);
    }
  }

  return clusters;
}

export function areEventsOverlapping(eventA: Event, eventB: Event): boolean {
  return eventA.end > eventB.start && eventA.start < eventB.end;
}

export function getMaxOverlap(cluster: Event[]): number {
  let maxOverlap = 0;
  const timeline: { type: string; time: number }[] = [];

  for (const event of cluster) {
    timeline.push({ type: "start", time: event.start });
    timeline.push({ type: "end", time: event.end });
  }

  timeline.sort((a, b) => a.time - b.time);

  let currentOverlap = 0;
  for (const eventPoint of timeline) {
    if (eventPoint.type === "start") {
      currentOverlap++;
    } else {
      currentOverlap--;
    }
    maxOverlap = Math.max(maxOverlap, currentOverlap);
  }

  return maxOverlap;
}

export function getEmptySlot(
  positionedEvents: (Event & { position: number })[],
  targetEvent: Event
): number {
  for (let position = 0; position < positionedEvents.length + 1; position++) {
    if (
      positionedEvents.every(
        (event) =>
          event.position !== position ||
          !areEventsOverlapping(event, targetEvent)
      )
    ) {
      return position;
    }
  }
  return -1;
}
