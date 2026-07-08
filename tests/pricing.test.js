const test = require('node:test');
const assert = require('node:assert/strict');
const { getLivePrice } = require('../utils/pricing');

test('returns seeded pricing when no live pricing endpoint is configured', async () => {
  delete process.env.PRICING_API_URL;

  const result = await getLivePrice({ brand: 'Hyundai', name: 'i20' }, 7.5);

  assert.equal(result.price, 7.5);
  assert.equal(result.source, 'seeded');
});
