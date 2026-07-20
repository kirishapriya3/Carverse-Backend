const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "carverse-secret-key";
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://stunning-haupia-b750ab.netlify.app",
    "https://glistening-daifuku-af446f.netlify.app",
    process.env.FRONTEND_URL,
    /\.vercel\.app$/,
    /\.netlify\.app$/,
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Carverse API is running...");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/search-history", require("./routes/searchHistoryRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
