"use strict";

const { knexSnakeCaseMappers } = require("objection");

const config = require("./config");

module.exports = {
  ...config.database,
  ...knexSnakeCaseMappers(),
};
