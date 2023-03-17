import React, { useState } from "react";
import { Event } from "./utils";

interface EventFormProps {
  onAddEvent: (event: Event) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Date.now(),
      title,
      start: parseInt(start, 10),
      end: parseInt(end, 10),
    };
    onAddEvent(newEvent);
    setTitle("");
    setStart("");
    setEnd("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 items-end">
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1">
          Event title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="start" className="mb-1">
          Start hour
        </label>
        <input
          id="start"
          type="number"
          min="0"
          max="24"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="end" className="mb-1">
          End hour
        </label>
        <input
          id="end"
          type="number"
          min="0"
          max="24"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add event
      </button>
    </form>
  );
};
