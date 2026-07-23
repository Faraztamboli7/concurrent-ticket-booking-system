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
      "UPDATE seats SET status='LOCKED', locked_at=NOW() WHERE id=$1 RETURNING *",
      [seatId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to lock seat"
    });
  }
};

const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.params;

    const result = await pool.query(
      "UPDATE seats SET status='BOOKED' WHERE id=$1 RETURNING *",
      [seatId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
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

