const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/Car");

dotenv.config();

const createCar = ({ name, brand, type, price, seats, fuelType, transmission = "Manual", rating, mileage, description, image = "" }) => ({
  name,
  brand,
  type,
  price,
  seats,
  fuelType,
  transmission,
  rating,
  mileage,
  image,
  description,
});

const cars = [
  createCar({ name: "Creta", brand: "Hyundai", type: "SUV", price: 11.5, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.4, mileage: 16.8, description: "Best-selling SUV with modern features and smooth ride." }),
  createCar({ name: "Venue", brand: "Hyundai", type: "SUV", price: 8.0, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 4.2, mileage: 17.5, description: "Compact SUV perfect for city drives with great mileage." }),
  createCar({ name: "Nexon", brand: "Tata", type: "SUV", price: 8.5, seats: 5, fuelType: "Diesel", transmission: "Manual", rating: 4.3, mileage: 19.8, description: "5-star safety rated compact SUV with strong build quality." }),
  createCar({ name: "Brezza", brand: "Maruti Suzuki", type: "SUV", price: 8.3, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.1, mileage: 19.8, description: "Stylish and fuel-efficient compact SUV with advanced tech." }),
  createCar({ name: "Swift", brand: "Maruti Suzuki", type: "Hatchback", price: 6.5, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 4.2, mileage: 23.2, description: "India's most loved hatchback with sporty looks and great mileage." }),
  createCar({ name: "i20", brand: "Hyundai", type: "Hatchback", price: 7.5, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.3, mileage: 20.3, description: "Premium hatchback with sunroof and connected features." }),
  createCar({ name: "City", brand: "Honda", type: "Sedan", price: 12.0, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.4, mileage: 18.4, description: "Premium sedan with spacious cabin and refined performance." }),
  createCar({ name: "Verna", brand: "Hyundai", type: "Sedan", price: 11.0, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.3, mileage: 20.6, description: "Turbocharged sedan with bold design and tech-loaded cabin." }),
  createCar({ name: "Fortuner", brand: "Toyota", type: "SUV", price: 33.0, seats: 7, fuelType: "Diesel", transmission: "Automatic", rating: 4.6, mileage: 14.0, description: "Legendary SUV known for reliability and off-road capability." }),
  createCar({ name: "Thar", brand: "Mahindra", type: "SUV", price: 14.0, seats: 4, fuelType: "Diesel", transmission: "Manual", rating: 4.5, mileage: 15.2, description: "Iconic off-roader with rugged design and 4x4 capability." }),
  createCar({ name: "Scorpio-N", brand: "Mahindra", type: "SUV", price: 13.5, seats: 7, fuelType: "Diesel", transmission: "Manual", rating: 4.4, mileage: 15.0, description: "Powerful 7-seater SUV with commanding road presence." }),
  createCar({ name: "Nexon EV", brand: "Tata", type: "SUV", price: 14.5, seats: 5, fuelType: "Electric", transmission: "Automatic", rating: 4.4, mileage: 312, description: "India's best-selling electric SUV with 312 km range." }),
  createCar({ name: "Punch EV", brand: "Tata", type: "Hatchback", price: 10.5, seats: 5, fuelType: "Electric", transmission: "Automatic", rating: 4.2, mileage: 421, description: "Affordable electric hatchback with impressive range." }),
  createCar({ name: "Ertiga", brand: "Maruti Suzuki", type: "MUV", price: 9.0, seats: 7, fuelType: "CNG", transmission: "Manual", rating: 4.1, mileage: 26.1, description: "Family MPV with 7 seats and excellent CNG mileage." }),
  createCar({ name: "Innova Crysta", brand: "Toyota", type: "MUV", price: 20.0, seats: 7, fuelType: "Diesel", transmission: "Automatic", rating: 4.6, mileage: 15.1, description: "Premium 7-seater MPV, the gold standard for comfort." }),
  createCar({ name: "Kiger", brand: "Renault", type: "SUV", price: 6.2, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 3.9, mileage: 19.4, description: "Budget-friendly SUV with city-friendly proportions." }),
  createCar({ name: "Sonet", brand: "Kia", type: "SUV", price: 8.1, seats: 5, fuelType: "Diesel", transmission: "Automatic", rating: 4.2, mileage: 18.9, description: "Stylish compact SUV with premium cabin touches." }),
  createCar({ name: "Seltos", brand: "Kia", type: "SUV", price: 11.2, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.3, mileage: 17.4, description: "Feature-rich SUV known for its comfort and design." }),
  createCar({
    name: "Astor",
    brand: "MG",
    type: "SUV",
    price: 10.8,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Automatic",
    rating: 4.1,
    mileage: 17.2,
    description: "Connected SUV with a strong value proposition.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/MG_ZS_%28crossover%2C_second_generation%29_DSC_8542.jpg/960px-MG_ZS_%28crossover%2C_second_generation%29_DSC_8542.jpg"
  }),
  createCar({ name: "ZS EV", brand: "MG", type: "SUV", price: 18.5, seats: 5, fuelType: "Electric", transmission: "Automatic", rating: 4.0, mileage: 461, description: "Premium electric SUV with long-range capability." }),
  createCar({ name: "XUV 3XO", brand: "Mahindra", type: "SUV", price: 7.8, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 4.0, mileage: 20.1, description: "Modern sub-compact SUV with a youthful design." }),
  createCar({ name: "XUV700", brand: "Mahindra", type: "SUV", price: 14.8, seats: 7, fuelType: "Diesel", transmission: "Automatic", rating: 4.5, mileage: 16.0, description: "High-tech 7-seater SUV with premium road presence." }),
  createCar({ name: "Harrier", brand: "Tata", type: "SUV", price: 15.2, seats: 5, fuelType: "Diesel", transmission: "Manual", rating: 4.2, mileage: 16.8, description: "Bold and spacious SUV with strong road presence." }),
  createCar({ name: "Safari", brand: "Tata", type: "SUV", price: 16.1, seats: 7, fuelType: "Diesel", transmission: "Automatic", rating: 4.3, mileage: 14.6, description: "Large 7-seater family SUV with premium comfort." }),
  createCar({ name: "Altroz", brand: "Tata", type: "Hatchback", price: 6.8, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 4.0, mileage: 19.3, description: "Smart hatchback with strong safety and modern styling." }),
  createCar({ name: "Tiago", brand: "Tata", type: "Hatchback", price: 5.4, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 3.8, mileage: 20.0, description: "Value-packed hatchback for everyday commutes." }),
  createCar({ name: "Polo", brand: "Volkswagen", type: "Hatchback", price: 9.4, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.1, mileage: 18.6, description: "European hatchback with refined driving dynamics." }),
  createCar({ name: "Virtus", brand: "Volkswagen", type: "Sedan", price: 11.8, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.2, mileage: 18.3, description: "Premium sedan with a spacious cabin and German feel." }),
  createCar({ name: "Rapid", brand: "Skoda", type: "Sedan", price: 10.1, seats: 5, fuelType: "Diesel", transmission: "Manual", rating: 4.0, mileage: 19.7, description: "Solid sedan with a comfortable ride and good efficiency." }),
  createCar({ name: "Slavia", brand: "Skoda", type: "Sedan", price: 11.4, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.1, mileage: 18.1, description: "Elegant sedan with a polished cabin and strong value." }),
  createCar({ name: "Ciaz", brand: "Maruti Suzuki", type: "Sedan", price: 9.3, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 4.0, mileage: 20.6, description: "Comfort-focused sedan for smooth family travel." }),
  createCar({ name: "Dzire", brand: "Maruti Suzuki", type: "Sedan", price: 6.7, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 4.1, mileage: 22.0, description: "Affordable and efficient compact sedan." }),
  createCar({ name: "Aura", brand: "Tata", type: "Sedan", price: 6.9, seats: 5, fuelType: "Diesel", transmission: "Manual", rating: 3.9, mileage: 21.0, description: "Compact sedan with a practical cabin and good mileage." }),
  createCar({ name: "XL6", brand: "Maruti Suzuki", type: "MUV", price: 11.5, seats: 6, fuelType: "Petrol", transmission: "Automatic", rating: 4.2, mileage: 20.2, description: "Premium family MPV with captain seats and modern features." }),
  createCar({ name: "Carens", brand: "Kia", type: "MUV", price: 10.9, seats: 7, fuelType: "Petrol", transmission: "Manual", rating: 4.3, mileage: 16.7, description: "Smart people-mover with flexible seating and premium styling." }),
  createCar({ name: "Triber", brand: "Renault", type: "MUV", price: 6.0, seats: 7, fuelType: "Petrol", transmission: "Manual", rating: 3.8, mileage: 18.5, description: "Affordable 7-seater for compact family budgets." }),
  createCar({ name: "Marazzo", brand: "Mahindra", type: "MUV", price: 14.4, seats: 7, fuelType: "Diesel", transmission: "Manual", rating: 4.0, mileage: 17.3, description: "Spacious family MPV with flexible seating arrangements." }),
  createCar({ name: "Innova Hycross", brand: "Toyota", type: "MUV", price: 19.8, seats: 7, fuelType: "Hybrid", transmission: "Automatic", rating: 4.6, mileage: 23.2, description: "Premium hybrid MPV with excellent comfort." }),
  createCar({ name: "Camry Hybrid", brand: "Toyota", type: "Sedan", price: 46.5, seats: 5, fuelType: "Hybrid", transmission: "Automatic", rating: 4.7, mileage: 19.8, description: "Executive hybrid sedan with smooth refinement." }),
  createCar({ name: "Prius", brand: "Toyota", type: "Hatchback", price: 42.0, seats: 5, fuelType: "Hybrid", transmission: "Automatic", rating: 4.6, mileage: 25.0, description: "Efficient hybrid hatchback with strong eco credentials." }),
  createCar({ name: "A4", brand: "Audi", type: "Sedan", price: 44.0, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.5, mileage: 14.8, description: "Luxury sedan with a premium cabin and confident drive." }),
  createCar({ name: "C-Class", brand: "Mercedes", type: "Sedan", price: 55.0, seats: 5, fuelType: "Diesel", transmission: "Automatic", rating: 4.7, mileage: 16.2, description: "Executive sedan with premium comfort and technology." }),
  createCar({ name: "3 Series", brand: "BMW", type: "Sedan", price: 48.0, seats: 5, fuelType: "Petrol", transmission: "Automatic", rating: 4.6, mileage: 14.4, description: "Sporty luxury sedan with a dynamic driving experience." }),
  createCar({ name: "XC60", brand: "Volvo", type: "SUV", price: 57.0, seats: 5, fuelType: "Diesel", transmission: "Automatic", rating: 4.5, mileage: 13.8, description: "Premium safety-focused SUV with Scandinavian design." }),
  createCar({ name: "Compass", brand: "Jeep", type: "SUV", price: 29.0, seats: 5, fuelType: "Diesel", transmission: "Automatic", rating: 4.2, mileage: 13.4, description: "Capable compact SUV with off-road chops." }),
  createCar({ name: "Kona Electric", brand: "Hyundai", type: "SUV", price: 24.0, seats: 5, fuelType: "Electric", transmission: "Automatic", rating: 4.2, mileage: 456, description: "Urban electric SUV with quick acceleration and practical range." }),
  createCar({ name: "Ioniq 5", brand: "Hyundai", type: "SUV", price: 46.0, seats: 5, fuelType: "Electric", transmission: "Automatic", rating: 4.6, mileage: 631, description: "Modern EV with fast charging and futuristic design." }),
  createCar({ name: "Leaf", brand: "Nissan", type: "Hatchback", price: 29.0, seats: 5, fuelType: "Electric", transmission: "Automatic", rating: 3.9, mileage: 311, description: "Quiet electric hatchback for smooth city use." }),
  createCar({ name: "Kwid", brand: "Renault", type: "Hatchback", price: 4.7, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 3.7, mileage: 21.7, description: "Affordable city hatchback with compact practicality." }),
  createCar({ name: "Kiger Turbo", brand: "Renault", type: "SUV", price: 7.2, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 3.8, mileage: 18.8, description: "Budget SUV with a peppy turbo petrol engine." }),
  createCar({ name: "Amaze", brand: "Honda", type: "Sedan", price: 7.8, seats: 5, fuelType: "Petrol", transmission: "Manual", rating: 4.0, mileage: 20.3, description: "Reliable sedan with good interior space." }),
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    // Try to enrich missing images from Wikipedia where possible
    const https = require('https');

    const fetchWikiThumb = (title) => {
      return new Promise((resolve) => {
        const query = encodeURIComponent(`${title} car`);
        const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrlimit=1&prop=pageimages&format=json&formatversion=2&pithumbsize=640`;
        const options = {
          headers: {
            'User-Agent': 'CarverseApp/1.0 (https://carverse.local)'
          }
        };

        https
          .get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
              try {
                const json = JSON.parse(data);
                const pages = json.query && json.query.pages;
                if (pages && pages.length > 0) {
                  const page = pages[0];
                  const thumb = page && page.thumbnail && page.thumbnail.source;
                  if (thumb) return resolve(thumb);
                }
              } catch (e) {
                // ignore
              }
              resolve(null);
            });
          })
          .on('error', () => resolve(null));
      });
    };

    // Enrich images where empty
    for (let i = 0; i < cars.length; i++) {
      if (!cars[i].image) {
        const tryTitles = [cars[i].name, `${cars[i].brand} ${cars[i].name}`, `${cars[i].name} ${cars[i].brand}`];
        let thumb = null;
        for (const t of tryTitles) {
          // eslint-disable-next-line no-await-in-loop
          thumb = await fetchWikiThumb(t);
          if (thumb) break;
        }
        cars[i].image = thumb || `https://via.placeholder.com/640x360?text=${encodeURIComponent(cars[i].brand + ' ' + cars[i].name)}`;
      }
    }

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
