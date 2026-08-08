const pool = require("../config/db");

const getSeatsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const result = await pool.query(
      "SELECT * FROM seats WHERE event_id = $1 ORDER BY seat_number",
      [eventId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch seats"
    });
  }
};

const lockSeat = async (req, res) => {
  try {
    const { seatId } = req.params;

    const result = await pool.query(
      `UPDATE seats
       SET status = 'LOCKED', locked_at = NOW()
       WHERE id = $1 AND status = 'AVAILABLE'
       RETURNING *`,
      [seatId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Seat is already locked/booked or not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Lock Seat Error:", error);
    res.status(500).json({
      message: "Failed to lock seat"
    });
  }
};

const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.params;

    console.log("Trying to book seat:", seatId);

    const result = await pool.query(
      `UPDATE seats
       SET status = 'BOOKED'
       WHERE id = $1 AND status = 'LOCKED'
       RETURNING *`,
      [seatId]
    );

    console.log("Rows updated:", result.rowCount);

    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Seat must be LOCKED before booking"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Book Error:", error);
    res.status(500).json({
      message: "Failed to book seat"
    });
  }
};
module.exports = {
  getSeatsByEvent,
  lockSeat,
  bookSeat
};

