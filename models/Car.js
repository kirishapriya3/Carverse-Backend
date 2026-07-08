const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["SUV", "Sedan", "Hatchback", "MUV", "Coupe", "Convertible", "Truck"],
      required: true,
    },
    price: {
      type: Number, // in Lakhs (INR)
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      default: "Manual",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    mileage: {
      type: Number, // km/l or km/charge
    },
    image: {
      type: String, // URL
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
