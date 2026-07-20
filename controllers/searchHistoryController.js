const SearchHistory = require("../models/SearchHistory");

const getSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const saveSearchHistory = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const entry = await SearchHistory.create({ user: req.user._id, query });
    res.status(201).json({ message: "Search saved", entry });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const clearSearchHistory = async (req, res) => {
  try {
    await SearchHistory.deleteMany({ user: req.user._id });
    res.status(200).json({ message: "Search history cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSearchHistory, saveSearchHistory, clearSearchHistory };
