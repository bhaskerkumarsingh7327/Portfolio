const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ✅ CORS FIX (FINAL)
app.use(cors({
  origin: "*",   // sab allow (development ke liye best)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// middleware
app.use(express.json());

// DB connect
connectDB();

// routes
app.use("/api/contact", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// server start
const PORT = process.env.PORT || 5001;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on port ${PORT}`);
});