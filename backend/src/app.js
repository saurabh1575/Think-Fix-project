const express = require("express");
const cors = require("cors");

// ROUTES
const studentRoutes = require("./routes/student.routes");
const coachRoutes = require("./routes/coach.routes");
const authRoutes = require("./routes/auth.routes");

const app = express(); // 🔥 THIS WAS MISSING

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTE MAPPING
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/coach", coachRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("ThinkFix Backend running 🚀");
});

module.exports = app;
