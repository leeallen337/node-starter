"use strict";

const onUpdateTrigger = require("../../lib/onUpdateTrigger");

exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.text("first_name").notNullable();
      table.text("last_name").notNullable();
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("users")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
