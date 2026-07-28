import Events from "./pages/Events";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      <nav className="bg-slate-800 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-center">
          🎟 Ticket Booking System
        </h1>
      </nav>

      <div className="text-center py-10">
        <h2 className="text-5xl font-bold mb-4">
          Book Events in Real Time
        </h2>

        <p className="text-slate-300 text-lg">
          Concurrent Seat Locking & Live Booking
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Events />
      </div>

    </div>
  );
}

export default App;