const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { searchCars, recommendCars } = require("../controllers/carController");

// POST /api/cars/search
router.post("/search", authMiddleware, searchCars);

// POST /api/cars/recommend
router.post("/recommend", authMiddleware, recommendCars);

module.exports = router;
