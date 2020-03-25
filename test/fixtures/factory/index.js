"use strict";

const fs = require("fs");
const path = require("path");
const factory = require("rosie").Factory;

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    require(path.join(__dirname, file));
  });

module.exports = factory;
