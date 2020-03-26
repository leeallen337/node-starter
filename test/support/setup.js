"use strict";

import Knex from "knex";

import knexfile from "../../knexfile";
import * as models from "../../src/models";

const knex = Knex(knexfile);

before(async function () {
  await knex.migrate.latest();
});

afterEach(async function () {
  await Object.keys(models).map((model) => models[model].query().truncate());
});

after(async function () {
  await knex.migrate
    .rollback(null, true)
    .then(() => knex.raw("DROP TABLE knex_migrations;"))
    .then(() => knex.raw("DROP TABLE knex_migrations_lock;"));
});
