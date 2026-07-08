const https = require('https');
const http = require('http');

const fetchLivePrice = async (car) => {
  const pricingApiUrl = process.env.PRICING_API_URL;

  if (!pricingApiUrl) {
    return null;
  }

  return new Promise((resolve) => {
    const request = (pricingApiUrl.startsWith('https') ? https : http).get(pricingApiUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const candidate = parsed?.price ?? parsed?.exshowroomPrice ?? parsed?.data?.price;

          if (typeof candidate === 'number' && Number.isFinite(candidate)) {
            resolve(candidate);
            return;
          }
        } catch (error) {
          console.warn('Unable to parse live pricing response', error.message);
        }
        resolve(null);
      });
    });

    request.on('error', () => {
      resolve(null);
    });
  });
};

const getLivePrice = async (car, fallbackPrice) => {
  try {
    const livePrice = await fetchLivePrice(car);

    if (typeof livePrice === 'number' && Number.isFinite(livePrice)) {
      return { price: Number(livePrice.toFixed(2)), source: 'live' };
    }
  } catch (error) {
    console.warn('Live pricing unavailable', error.message);
  }

  return { price: fallbackPrice, source: 'seeded' };
};

module.exports = { getLivePrice };
