'use strict';

exports.up = function(knex, Promise) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
};

exports.down = function(knex, Promise) {
  return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
