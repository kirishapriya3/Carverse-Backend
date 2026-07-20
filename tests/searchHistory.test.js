const test = require('node:test');
const assert = require('node:assert/strict');

const Car = require('../models/Car');
const SearchHistory = require('../models/SearchHistory');
const searchParser = require('../utils/searchParser');
const carControllerPath = '../controllers/carController';

delete require.cache[require.resolve(carControllerPath)];
searchParser.parseSearchQuery = () => ({ filter: {}, sort: {} });
const { searchCars } = require('../controllers/carController');

test('saves search history even when no cars match the query', async () => {
  const originalFind = Car.find;
  const originalCreate = SearchHistory.create;

  const createdEntries = [];
  Car.find = () => ({ sort: async () => [] });
  SearchHistory.create = async (entry) => {
    createdEntries.push(entry);
    return entry;
  };

  try {
    let statusCode = null;
    let responseBody = null;

    const res = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(body) {
        responseBody = body;
        return this;
      },
    };

    await searchCars({ body: { query: 'family sedan' }, user: { _id: 'user-1' } }, res);

    assert.equal(statusCode, 404);
    assert.equal(createdEntries.length, 1);
    assert.deepEqual(createdEntries[0], { user: 'user-1', query: 'family sedan' });
    assert.equal(responseBody.message, 'No cars found matching your requirements.');
  } finally {
    Car.find = originalFind;
    SearchHistory.create = originalCreate;
  }
});
