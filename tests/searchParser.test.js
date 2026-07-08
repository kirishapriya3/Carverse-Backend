const test = require('node:test');
const assert = require('node:assert/strict');
const { parseSearchQuery } = require('../utils/searchParser');

test('parses combined natural-language filters into a structured query', () => {
  const result = parseSearchQuery('automatic petrol SUV under 20 lakhs with good mileage');

  assert.equal(result.filter.price.$lte, 20);
  assert.equal(result.filter.transmission.$regex.source, '^Automatic$');
  assert.ok(result.filter.type.$regex);
  assert.equal(result.filter.fuelType.$regex.source, '^(?:Petrol)$');
  assert.equal(result.filter.mileage.$gte, 18);
  assert.equal(result.sort.mileage, -1);
});
