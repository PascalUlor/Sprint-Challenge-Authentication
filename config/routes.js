const axios = require('axios');
const userModel = require('../database/models');
const { validateUserRegistration } = require('../middlewares');

const {
  authenticate,
  createToken,
  validatePassword
} = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', validateUserRegistration, register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    const payload = req.new;
    createToken(res, 201, 'Signup succesful', ...payload);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
