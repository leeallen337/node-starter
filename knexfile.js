"use strict";

const { knexSnakeCaseMappers } = require("objection");

const config = require("./config");

module.exports = {
  pool: {
    max: 20,
    min: 10,
  },
  ...config.database,
  ...knexSnakeCaseMappers(),
};
