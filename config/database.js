const { Model } = require('objection');
const knex = require('knex')('production')
const knexConfig = require('./knexfile');


Model.knex(knex);

module.exports = { knex };
