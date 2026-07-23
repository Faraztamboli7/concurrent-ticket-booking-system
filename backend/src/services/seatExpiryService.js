const pool = require("../config/db");

setInterval(async () => {
  try {
    await pool.query(`
      UPDATE seats
      SET status='AVAILABLE',
          locked_at=NULL
      WHERE status='LOCKED'
      AND locked_at < NOW() - INTERVAL '2 minutes'
    `);

    console.log("Checked expired locks");
  } catch (err) {
    console.error(err);
  }
}, 10000);