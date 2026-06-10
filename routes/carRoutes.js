const express = require("express");
const router = express.Router();
const { searchCars, recommendCars } = require("../controllers/carController");

// POST /api/cars/search
router.post("/search", searchCars);

// POST /api/cars/recommend
router.post("/recommend", recommendCars);

module.exports = router;
