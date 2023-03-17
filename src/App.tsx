import { useState } from "react";
import { EventForm } from "./EventForm";
import { EventTimeline } from "./EventTimeline";
import { Event } from "./utils";

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  const handleAddEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const handleRemoveEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-1">Event Scheduler</h1>
        <p className="text-m text-gray-500 mb-8">
          Created in collaboration with GPT-4 by OpenAI
        </p>
        <EventForm onAddEvent={handleAddEvent} />
        <div className="mt-8">
          <EventTimeline events={events} onRemoveEvent={handleRemoveEvent} />
        </div>
      </div>
    </div>
  );
}

export default App;
