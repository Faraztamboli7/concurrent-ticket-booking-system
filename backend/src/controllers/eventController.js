const pool = require("../config/db");

const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch events"
    });
  }
};

module.exports = {
  getAllEvents
};