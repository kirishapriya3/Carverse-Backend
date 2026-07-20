const Car = require("../models/Car");
const SearchHistory = require("../models/SearchHistory");
const { getLivePrice } = require("../utils/pricing");
const { parseSearchQuery } = require("../utils/searchParser");

// @desc   Search cars based on natural-language-like filters
// @route  POST /api/cars/search
const searchCars = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const { filter, sort } = parseSearchQuery(query);

    let cars = await Car.find(filter).sort(sort.rating || sort.mileage ? sort : { rating: -1 });

    if (req.user?._id) {
      await SearchHistory.create({ user: req.user._id, query });
    }

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found matching your requirements." });
    }

    const carsWithPricing = await Promise.all(
      cars.map(async (car) => {
        const pricing = await getLivePrice(car, car.price);
        return {
          ...car.toObject(),
          price: pricing.price,
          priceSource: pricing.source,
        };
      })
    );

    res.status(200).json({ count: carsWithPricing.length, cars: carsWithPricing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// @desc   Recommend top 3 cars based on weighted user preferences
// @route  POST /api/cars/recommend
const recommendCars = async (req, res) => {
  try {
    const { brand, budget, familySize, mileage, safety } = req.body;

    // Validate at least one preference
    if (!budget && !familySize && !mileage && !safety) {
      return res.status(400).json({ message: "Please provide at least one preference." });
    }

    // Build a loose filter — only hard-filter on brand; budget is optional
    const filter = {};
    if (brand && brand !== "Any") {
      filter.brand = { $regex: new RegExp(brand, "i") };
    }
    // No budget filter here — all cars are considered and scored accordingly

    let cars = await Car.find(filter);

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found for the selected brand." });
    }

    // ── Scoring Engine ────────────────────────────────────────────
    // Each criterion contributes up to 25 points (total = 100)
    const scored = cars.map((car) => {
      let score = 0;
      const breakdown = [];

      // 1. Budget score (25 pts) — reward cars well within budget; skip if no budget given
      if (budget) {
        const budgetNum = parseFloat(budget);
        const ratio = car.price / budgetNum;
        const budgetScore = ratio <= 0.6
          ? 25
          : ratio <= 0.8
          ? 20
          : ratio <= 1.0
          ? 15
          : Math.max(0, Math.round(15 - (ratio - 1) * 30)); // penalise cars over budget but don't hard-exclude
        score += budgetScore;
        breakdown.push(`Budget fit: ${budgetScore}/25 (₹${car.price}L vs ₹${budgetNum}L budget)`);
      } else {
        score += 15; // neutral — no budget specified, all cars considered equally
        breakdown.push("Budget: not specified — all price ranges included");
      }

      // 2. Family size score (25 pts) — seats match
      if (familySize) {
        const needed = parseInt(familySize);
        let seatScore = 0;
        if (car.seats >= needed) {
          seatScore = car.seats === needed ? 25 : 18; // exact match vs more than enough
        } else {
          seatScore = 5; // fewer seats than needed
        }
        score += seatScore;
        breakdown.push(`Seating: ${seatScore}/25 (${car.seats} seats, need ${needed})`);
      } else {
        score += 15;
        breakdown.push("Family size: not specified");
      }

      // 3. Mileage score (25 pts)
      if (mileage === "high") {
        const mileageScore = car.mileage >= 22 ? 25 : car.mileage >= 18 ? 18 : car.mileage >= 14 ? 10 : 5;
        score += mileageScore;
        breakdown.push(`Mileage: ${mileageScore}/25 (${car.mileage} ${car.fuelType === "Electric" ? "km range" : "km/l"}, priority: high)`);
      } else if (mileage === "medium") {
        const mileageScore = car.mileage >= 15 ? 25 : car.mileage >= 12 ? 18 : 10;
        score += mileageScore;
        breakdown.push(`Mileage: ${mileageScore}/25 (${car.mileage} ${car.fuelType === "Electric" ? "km range" : "km/l"}, priority: medium)`);
      } else {
        score += 15;
        breakdown.push("Mileage: not specified");
      }

      // 4. Safety / Rating score (25 pts)
      if (safety === "high") {
        const safetyScore = car.rating >= 4.5 ? 25 : car.rating >= 4.2 ? 18 : car.rating >= 4.0 ? 12 : 5;
        score += safetyScore;
        breakdown.push(`Safety/Rating: ${safetyScore}/25 (rating ${car.rating}/5, priority: high)`);
      } else if (safety === "medium") {
        const safetyScore = car.rating >= 4.0 ? 25 : car.rating >= 3.5 ? 18 : 10;
        score += safetyScore;
        breakdown.push(`Safety/Rating: ${safetyScore}/25 (rating ${car.rating}/5, priority: medium)`);
      } else {
        score += 15;
        breakdown.push("Safety: not specified");
      }

      return { car, score, breakdown };
    });

    // Sort by score descending, take top 3
    scored.sort((a, b) => b.score - a.score);
    const top3 = scored.slice(0, 3);

    // Generate a human-readable explanation for each
    const results = await Promise.all(top3.map(async ({ car, score, breakdown }, index) => {
      const rank = index + 1;
      const reasons = [];
      const pricing = await getLivePrice(car, car.price);
      const pricedCar = {
        ...car.toObject(),
        price: pricing.price,
        priceSource: pricing.source,
      };

      if (budget && pricedCar.price <= parseFloat(budget)) {
        const savings = (parseFloat(budget) - pricedCar.price).toFixed(1);
        reasons.push(`fits your ₹${budget}L budget with ₹${savings}L to spare`);
      } else if (!budget) {
        reasons.push(`is priced at ₹${pricedCar.price}L`);
      }
      if (familySize && car.seats >= parseInt(familySize)) {
        reasons.push(`comfortably seats ${car.seats} people`);
      }
      if (mileage === "high" && car.mileage >= 18) {
        reasons.push(`delivers excellent ${car.mileage} ${car.fuelType === "Electric" ? "km range" : "km/l"}`);
      }
      if (safety === "high" && car.rating >= 4.2) {
        reasons.push(`has a strong safety/quality rating of ${car.rating}/5`);
      }
      if (car.fuelType === "Electric") {
        reasons.push("is fully electric — zero fuel costs");
      }

      const explanation =
        reasons.length > 0
          ? `The ${car.brand} ${car.name} is our #${rank} pick because it ${reasons.join(", and ")}.`
          : `The ${car.brand} ${car.name} scored ${score}/100 overall and is a solid choice for your needs.`;

      return {
        rank,
        score,
        car: pricedCar,
        breakdown,
        explanation,
      };
    }));

    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = { searchCars, recommendCars };
