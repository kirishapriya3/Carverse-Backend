const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getFavorites, addFavorite, removeFavorite } = require("../controllers/favoriteController");

router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, addFavorite);
router.delete("/:carId", authMiddleware, removeFavorite);

module.exports = router;
