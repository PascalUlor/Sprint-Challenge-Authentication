const knex = require('knex');

const knexConfig = require('../knexfile.js');
const environment = require('../environments');

module.exports = knex(knexConfig[environment]);
