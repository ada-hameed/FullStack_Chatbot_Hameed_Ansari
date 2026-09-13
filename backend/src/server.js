require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./database");
const enquiryRoutes = require("./routes/enquiryRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/chat", chatRoutes);
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "DroneTV Backend API is running!",
  });
});

// Database connection test
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});