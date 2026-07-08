const normalizeWord = (value) => value.toLowerCase().trim();

const parseSearchQuery = (query) => {
  const normalized = query.toLowerCase();
  const filter = {};
  const sort = {};

  const priceMatch = normalized.match(/(?:under|below|less than|within|upto|up to)\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|l)?/);
  if (priceMatch) {
    filter.price = { $lte: parseFloat(priceMatch[1]) };
  }

  const typeMap = {
    suv: 'SUV',
    sedan: 'Sedan',
    hatchback: 'Hatchback',
    muv: 'MUV',
    coupe: 'Coupe',
    convertible: 'Convertible',
    truck: 'Truck',
  };

  for (const [keyword, value] of Object.entries(typeMap)) {
    if (normalized.includes(keyword)) {
      filter.type = { $regex: new RegExp(`^${value}$`, 'i') };
      break;
    }
  }

  const fuelMap = {
    petrol: 'Petrol',
    diesel: 'Diesel',
    electric: 'Electric',
    hybrid: 'Hybrid',
    cng: 'CNG',
  };

  for (const [keyword, value] of Object.entries(fuelMap)) {
    if (normalized.includes(keyword)) {
      filter.fuelType = { $regex: new RegExp(`^(?:${value})$`, 'i') };
      break;
    }
  }

  const brandMap = {
    hyundai: 'Hyundai',
    maruti: 'Maruti',
    tata: 'Tata',
    mahindra: 'Mahindra',
    toyota: 'Toyota',
    honda: 'Honda',
    kia: 'Kia',
    ford: 'Ford',
    volkswagen: 'Volkswagen',
    skoda: 'Skoda',
    mg: 'MG',
  };

  for (const [keyword, value] of Object.entries(brandMap)) {
    if (normalized.includes(keyword)) {
      filter.brand = { $regex: new RegExp(value, 'i') };
      break;
    }
  }

  const seatsMatch = normalized.match(/(\d+)\s*(?:seat|seater|seats)/);
  if (seatsMatch) {
    filter.seats = parseInt(seatsMatch[1], 10);
  }

  if (normalized.includes('family') || normalized.includes('7 seat') || normalized.includes('seven seat')) {
    filter.seats = 7;
  }

  const transmissionKeywords = ['automatic', 'manual'];
  const detectedTransmission = transmissionKeywords.find((keyword) => normalized.includes(keyword));
  if (detectedTransmission) {
    const value = detectedTransmission.charAt(0).toUpperCase() + detectedTransmission.slice(1);
    filter.transmission = { $regex: new RegExp(`^${value}$`, 'i') };
  }

  if (normalized.includes('good mileage') || normalized.includes('high mileage') || normalized.includes('better mileage')) {
    filter.mileage = { $gte: 18 };
    sort.mileage = -1;
  }

  if (normalized.includes('best') || normalized.includes('top')) {
    sort.rating = -1;
  }

  return {
    filter,
    sort,
  };
};

module.exports = { parseSearchQuery, normalizeWord };
