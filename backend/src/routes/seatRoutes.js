const express = require("express");
const router = express.Router();

const {
  getSeatsByEvent,
  lockSeat,
  bookSeat
} = require("../controllers/seatController");

router.get("/:eventId/seats", getSeatsByEvent);

router.post("/:seatId/lock", lockSeat);
router.post("/:seatId/book", bookSeat);
module.exports = router;