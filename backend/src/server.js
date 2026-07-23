// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const pool = require("./config/db");
// // const pool = require("./src/config/db");
// const eventRoutes = require("./routes/eventRoutes");
// // const eventRoutes = require("./src/routes/eventRoutes");
// const seatRoutes = require("./routes/seatRoutes");
// // const seatRoutes = require("./src/routes/seatRoutes");

const express = require("express");
const cors = require("cors");
require("./services/seatExpiryService");
const dotenv = require("dotenv");

const pool = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const seatRoutes = require("./routes/seatRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database Connection Failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.use("/events", seatRoutes);

app.use("/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});