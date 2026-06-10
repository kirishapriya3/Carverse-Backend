const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/Car");

dotenv.config();

const cars = [
  {
    name: "Creta",
    brand: "Hyundai",
    type: "SUV",
    price: 11.5,
    seats: 5,
    fuelType: "Petrol",
    rating: 4.4,
    mileage: 16.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/2020_Hyundai_Creta_%28SU2%29_Elite_wagon_%282021-11-06%29_01.jpg/640px-2020_Hyundai_Creta_%28SU2%29_Elite_wagon_%282021-11-06%29_01.jpg",
    description: "Best-selling SUV with modern features and smooth ride.",
  },
  {
    name: "Venue",
    brand: "Hyundai",
    type: "SUV",
    price: 8.0,
    seats: 5,
    fuelType: "Petrol",
    rating: 4.2,
    mileage: 17.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2019_Hyundai_Venue_%28QX%29_Elite_wagon_%282019-10-18%29_01.jpg/640px-2019_Hyundai_Venue_%28QX%29_Elite_wagon_%282019-10-18%29_01.jpg",
    description: "Compact SUV perfect for city drives with great mileage.",
  },
  {
    name: "Nexon",
    brand: "Tata",
    type: "SUV",
    price: 8.5,
    seats: 5,
    fuelType: "Diesel",
    rating: 4.3,
    mileage: 19.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/sixty/Tata_Nexon_facelift_%28front%29.jpg/640px-Tata_Nexon_facelift_%28front%29.jpg",
    description: "5-star safety rated compact SUV with strong build quality.",
  },
  {
    name: "Brezza",
    brand: "Maruti Suzuki",
    type: "SUV",
    price: 8.3,
    seats: 5,
    fuelType: "Petrol",
    rating: 4.1,
    mileage: 19.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/2022_Maruti_Suzuki_Brezza_Alpha_%28facelift%2C_India%29%2C_front_8.28.22.jpg/640px-2022_Maruti_Suzuki_Brezza_Alpha_%28facelift%2C_India%29%2C_front_8.28.22.jpg",
    description: "Stylish and fuel-efficient compact SUV with advanced tech.",
  },
  {
    name: "Swift",
    brand: "Maruti Suzuki",
    type: "Hatchback",
    price: 6.5,
    seats: 5,
    fuelType: "Petrol",
    rating: 4.2,
    mileage: 23.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Maruti_Suzuki_Swift_2018_red.jpg/640px-Maruti_Suzuki_Swift_2018_red.jpg",
    description: "India's most loved hatchback with sporty looks and great mileage.",
  },
  {
    name: "i20",
    brand: "Hyundai",
    type: "Hatchback",
    price: 7.5,
    seats: 5,
    fuelType: "Petrol",
    rating: 4.3,
    mileage: 20.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2021_Hyundai_i20_%28BC3%29_Elite_hatchback_%282021-05-26%29_01.jpg/640px-2021_Hyundai_i20_%28BC3%29_Elite_hatchback_%282021-05-26%29_01.jpg",
    description: "Premium hatchback with sunroof and connected features.",
  },
  {
    name: "City",
    brand: "Honda",
    type: "Sedan",
    price: 12.0,
    seats: 5,
    fuelType: "Petrol",
    rating: 4.4,
    mileage: 18.4,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/2020_Honda_City_1.5_V_%28facelift%2C_red%29%2C_front_8.30.20.jpg/640px-2020_Honda_City_1.5_V_%28facelift%2C_red%29%2C_front_8.30.20.jpg",
    description: "Premium sedan with spacious cabin and refined performance.",
  },
  {
    name: "Verna",
    brand: "Hyundai",
    type: "Sedan",
    price: 11.0,
    seats: 5,
    fuelType: "Petrol",
    rating: 4.3,
    mileage: 20.6,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Hyundai_Verna_2023_%28cropped%29.jpg/640px-Hyundai_Verna_2023_%28cropped%29.jpg",
    description: "Turbocharged sedan with bold design and tech-loaded cabin.",
  },
  {
    name: "Fortuner",
    brand: "Toyota",
    type: "SUV",
    price: 33.0,
    seats: 7,
    fuelType: "Diesel",
    rating: 4.6,
    mileage: 14.0,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/2016_Toyota_Fortuner_%28AN160%2C_TRD_Sportivo%29_wagon_%282018-08-27%29_01.jpg/640px-2016_Toyota_Fortuner_%28AN160%2C_TRD_Sportivo%29_wagon_%282018-08-27%29_01.jpg",
    description: "Legendary SUV known for reliability and off-road capability.",
  },
  {
    name: "Thar",
    brand: "Mahindra",
    type: "SUV",
    price: 14.0,
    seats: 4,
    fuelType: "Diesel",
    rating: 4.5,
    mileage: 15.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mahindra_Thar_2020_front.jpg/640px-Mahindra_Thar_2020_front.jpg",
    description: "Iconic off-roader with rugged design and 4x4 capability.",
  },
  {
    name: "Scorpio-N",
    brand: "Mahindra",
    type: "SUV",
    price: 13.5,
    seats: 7,
    fuelType: "Diesel",
    rating: 4.4,
    mileage: 15.0,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mahindra_Scorpio_N_2022.jpg/640px-Mahindra_Scorpio_N_2022.jpg",
    description: "Powerful 7-seater SUV with commanding road presence.",
  },
  {
    name: "Nexon EV",
    brand: "Tata",
    type: "SUV",
    price: 14.5,
    seats: 5,
    fuelType: "Electric",
    rating: 4.4,
    mileage: 312,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tata_Nexon_EV_Max_%28facelift%29_at_Auto_Expo_2023.jpg/640px-Tata_Nexon_EV_Max_%28facelift%29_at_Auto_Expo_2023.jpg",
    description: "India's best-selling electric SUV with 312 km range.",
  },
  {
    name: "Punch EV",
    brand: "Tata",
    type: "Hatchback",
    price: 10.5,
    seats: 5,
    fuelType: "Electric",
    rating: 4.2,
    mileage: 421,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tata_Punch_EV_at_Bharat_Mobility_2024.jpg/640px-Tata_Punch_EV_at_Bharat_Mobility_2024.jpg",
    description: "Affordable electric hatchback with impressive range.",
  },
  {
    name: "Ertiga",
    brand: "Maruti Suzuki",
    type: "MUV",
    price: 9.0,
    seats: 7,
    fuelType: "CNG",
    rating: 4.1,
    mileage: 26.1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/2018_Maruti_Suzuki_Ertiga_VXi_AT_%28India%29%2C_front_8.11.18.jpg/640px-2018_Maruti_Suzuki_Ertiga_VXi_AT_%28India%29%2C_front_8.11.18.jpg",
    description: "Family MPV with 7 seats and excellent CNG mileage.",
  },
  {
    name: "Innova Crysta",
    brand: "Toyota",
    type: "MUV",
    price: 20.0,
    seats: 7,
    fuelType: "Diesel",
    rating: 4.6,
    mileage: 15.1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Toyota_Innova_Crysta_2.8_GX_AT_%28India%29%2C_front_8.12.18.jpg/640px-Toyota_Innova_Crysta_2.8_GX_AT_%28India%29%2C_front_8.12.18.jpg",
    description: "Premium 7-seater MPV, the gold standard for comfort.",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    await Car.deleteMany({});
    console.log("Existing cars cleared.");

    await Car.insertMany(cars);
    console.log(`${cars.length} cars seeded successfully!`);

    mongoose.connection.close();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
