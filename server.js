const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://stunning-haupia-b750ab.netlify.app",
    "https://glistening-daifuku-af446f.netlify.app",
    process.env.FRONTEND_URL,
    /\.vercel\.app$/,
    /\.netlify\.app$/,
  ].filter(Boolean),
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Carverse API is running...");
});

// Routes
app.use("/api/cars", require("./routes/carRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
