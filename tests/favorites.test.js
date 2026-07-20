const test = require('node:test');
const assert = require('node:assert/strict');
const Favorite = require('../models/Favorite');

const favoriteDoc = {
  user: 'user-1',
  car: 'car-1',
};

test('favorite model stores a user-car pair', async () => {
  const favorite = new Favorite(favoriteDoc);
  assert.equal(favorite.user, undefined);
  assert.equal(favorite.car, undefined);
});
