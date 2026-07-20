const Favorite = require("../models/Favorite");
const Car = require("../models/Car");

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate("car");
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { carId } = req.body;

    if (!carId) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const existing = await Favorite.findOne({ user: req.user._id, car: carId });
    if (existing) {
      return res.status(200).json({ message: "Car already in favorites" });
    }

    const favorite = await Favorite.create({ user: req.user._id, car: carId });
    const populated = await favorite.populate("car");

    res.status(201).json({ message: "Favorite added", favorite: populated });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { carId } = req.params;

    await Favorite.deleteOne({ user: req.user._id, car: carId });
    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
