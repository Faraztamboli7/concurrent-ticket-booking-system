import { useEffect, useState } from "react";
import API from "../services/api";
import Seats from "./Seats";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  // const fetchEvents = async () => {
  //   const res = await API.get("/events");
  //   setEvents(res.data);
  // };

  const fetchEvents = async () => {
  try {
    const res = await API.get("/events");
    console.log("Backend events:", res.data);
    setEvents(res.data);
  } catch (error) {
    console.error("Events API error:", error);
  }
};
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-800 rounded-xl p-6 shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>

            <p className="text-slate-300 mb-2">📍 {event.venue}</p>

            <p className="text-green-400 font-bold mb-4">₹{event.price}</p>

            <button
              onClick={() => setSelectedEvent(event.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
            >
              View Seats
            </button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="mt-10">
          <Seats eventId={selectedEvent} />
        </div>
      )}
    </>
  );
}

export default Events;