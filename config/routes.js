const axios = require('axios');
const express = require('express');
const { validateUserRegistration } = require('../middlewares');
const requestHelper = require('../helpers');

module.exports = server => {
  server.post('/api/register', validateUserRegistration, register);
  server.post('/api/login', validatePassword, login);
  server.get('/api/jokes', authenticate, getJokes);
};
const {
  authenticate,
  createToken,
  validatePassword
} = require('../auth/authenticate');

async function register(req, res) {
  // implement user registration
  try {
    const payload = req.new;
    createToken(res, 201, 'Signup succesful', ...payload);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
}

async function login(req, res) {
  // implement user login
  try {
    const payload = req.user;
    createToken(res, 200, 'Login succesful', payload);
  } catch (err) {
    return requestHelper.error(res, 500, 'server error');
  }
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
