const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

Model.knex(knex);

module.exports = { knex };
