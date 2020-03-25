"use strict";

require("dotenv").config();

const path = require("path");
const env = process.env.NODE_ENV || "development";

module.exports = {
  ...require(path.join(__dirname, "env", env)),
  ...require(path.join(__dirname, "env", "all")),
};
