import React from "react";
import { Event } from "../utils";

interface TimelineEventProps {
  event: Event;
  left: number;
  width: number;
  onRemoveEvent: (id: number) => void;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  left,
  width,
  onRemoveEvent,
}) => {
  const eventHeight = ((event.end - event.start) * 100) / 24;
  return (
    <div
      key={event.id}
      className="absolute bg-blue-500 text-white border border-gray-300 rounded p-2 flex flex-col justify-between items-start"
      style={{
        top: `${(event.start * 100) / 24}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${eventHeight}%`,
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className="font-semibold">
          {event.title}
          <span className="text-xs ml-1">
            ({event.start}-{event.end})
          </span>
        </div>
        <button
          onClick={() => onRemoveEvent(event.id)}
          className="bg-red-500 text-white text-sm rounded p-0"
          title="Remove event"
          style={{
            width: "20px",
            height: "20px",
            lineHeight: "20px",
            textAlign: "center",
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
