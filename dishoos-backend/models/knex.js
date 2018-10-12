const env = process.env.NODE_ENV || 'prod';
const knexConfig = require('../knexfile.js')[env];
module.exports = require('knex')(knexConfig);
