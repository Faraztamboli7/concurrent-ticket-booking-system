import { useEffect, useState } from "react";
import API from "../services/api";

function Seats() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    const res = await API.get("/events/1/seats");
    setSeats(res.data);
  };

  const lockSeat = async (seatId) => {
    try {
      await API.post(`/events/${seatId}/lock`);

      setSelectedSeat(seatId);

      alert("Seat Locked!");

      fetchSeats();
    } catch (error) {
      console.error(error);
    }
  };

  const bookSeat = async (seatId) => {
    try {
      await API.post(`/events/${seatId}/book`);

      alert("Seat Booked!");

      fetchSeats();
    } catch (error) {
      console.error(error);
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

      {/* Seats */}
      <div className="flex flex-wrap gap-4 justify-center">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => lockSeat(seat.id)}
            className={`w-16 h-16 rounded-lg font-bold text-black shadow-lg transition hover:scale-110
              ${
                seat.status === "BOOKED"
                  ? "bg-red-500"
                  : seat.status === "LOCKED"
                  ? "bg-yellow-400"
                  : "bg-green-400"
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