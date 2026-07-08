const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('../models/Car');

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const cars = await Car.find({}).limit(12).lean();
    cars.forEach((c, i) => {
      console.log(i + 1, c.brand, c.name, '-', c.image || '<no image>');
    });
    await mongoose.disconnect();
  } catch (e) {
    console.error('err', e.message);
    process.exit(1);
  }
};

run();
