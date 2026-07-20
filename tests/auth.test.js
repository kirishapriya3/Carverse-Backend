const test = require('node:test');
const assert = require('node:assert/strict');
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/User');

const makeRes = () => {
  const res = {};
  res.statusCode = 200;
  res.body = null;
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    res.body = payload;
    return res;
  };
  return res;
};

test('registerUser returns a JWT and user payload', async () => {
  const originalFindOne = User.findOne;
  const originalCreate = User.create;

  User.findOne = async () => null;
  User.create = async (data) => ({
    _id: 'user-1',
    name: data.name,
    email: data.email,
    password: data.password,
  });

  const req = { body: { name: 'Asha', email: 'asha@example.com', password: 'secret123' } };
  const res = makeRes();

  await registerUser(req, res);

  assert.equal(res.statusCode, 201);
  assert.ok(res.body.token, 'expected token to be returned');
  assert.equal(res.body.user.email, 'asha@example.com');

  User.findOne = originalFindOne;
  User.create = originalCreate;
});
