import { useEffect, useState } from "react";
import API from "../services/api";

function Seats({ eventId }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    if (eventId) {
      fetchSeats();
    }
  }, [eventId]);

 const fetchSeats = async () => {
  try {
    const res = await API.get(`/events/${eventId}/seats`);

    console.log("Seats from backend:", res.data);

    setSeats(res.data);
  } catch (error) {
    console.error(error);
  }
};

  const lockSeat = async (seatId) => {
    try {
      await API.post(`/events/${eventId}/seats/${seatId}/lock`);

      setSelectedSeat(seatId);

      alert("Seat Locked!");

      fetchSeats();
    } catch (error) {
      console.error("Lock seat error:", error);
      alert("Unable to lock seat");
    }
  };

  const bookSeat = async (seatId) => {
    try {
      await API.post(`/events/${eventId}/seats/${seatId}/book`);

      alert("Seat Booked Successfully!");

      setSelectedSeat(null);

      fetchSeats();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Unable to book seat");
    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold text-center mb-6">
        🎟 Select Your Seat
      </h1>

      {/* Legend */}
      <div className="flex gap-6 justify-center mb-8">
        <div>🟩 Available</div>
        <div>🟨 Locked</div>
        <div>🟥 Booked</div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-5 gap-4 justify-items-center max-w-md mx-auto">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() =>
              seat.status === "AVAILABLE" && lockSeat(seat.id)
            }
            disabled={seat.status !== "AVAILABLE"}
            className={`w-16 h-16 rounded-lg font-bold text-black shadow-lg transition hover:scale-105
              ${
                seat.status === "BOOKED"
                  ? "bg-red-500 cursor-not-allowed"
                  : seat.status === "LOCKED"
                  ? "bg-yellow-400 cursor-not-allowed"
                  : "bg-green-400 hover:bg-green-500"
              }`}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>

      {/* Selected Seat */}
      {selectedSeat && (
        <div className="bg-slate-800 p-6 rounded-xl mt-8 max-w-md mx-auto text-center">

          <h2 className="text-xl font-bold mb-4">
            Selected Seat: {selectedSeat}
          </h2>

          <button
            onClick={() => bookSeat(selectedSeat)}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg w-full"
          >
            Confirm Booking
          </button>

        </div>
      )}

    </div>
  );
}

export default Seats;