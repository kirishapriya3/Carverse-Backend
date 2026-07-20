const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getSearchHistory, saveSearchHistory, clearSearchHistory } = require("../controllers/searchHistoryController");

router.get("/", authMiddleware, getSearchHistory);
router.post("/", authMiddleware, saveSearchHistory);
router.delete("/", authMiddleware, clearSearchHistory);

module.exports = router;
