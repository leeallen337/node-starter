"use strict";

const Knex = require("knex");

const knexfile = require("../../knexfile");
const models = require("../../models");

const knex = Knex(knexfile);

before(function () {
  return knex.migrate.latest();
});

afterEach(function () {
  return Promise.all(
    Object.keys(models).map((modelName) => {
      return models[modelName].query().truncate();
    })
  );
});

after(function () {
  return knex.migrate
    .rollback(null, true)
    .then(() => knex.raw("DROP TABLE knex_migrations;"))
    .then(() => knex.raw("DROP TABLE knex_migrations_lock;"));
});
