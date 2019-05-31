'use strict';

const Knex = require('knex');
const path = require('path');

const knexfile = require('../../knexfile');
const models = require('../../models');

const knex = Knex(knexfile);

const MIGRATIONS_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'db',
  'migrations'
);

before(function() {
  return knex.migrate.latest();
});

afterEach(function() {
  return Promise.all(
    Object.keys(models).map((modelName) => {
      return models[modelName].query().truncate();
    })
  );
});

after(function() {
  return knex.migrate.rollback(null, true);
});
