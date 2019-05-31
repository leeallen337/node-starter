'use strict';

const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const CONTROLLERS = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .reduce((accum, file) => {
    accum[path.basename(file, '.js')] = require(path.join(__dirname, file));

    return accum;
  }, {});

module.exports = CONTROLLERS;
