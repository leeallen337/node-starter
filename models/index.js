'use strict';

const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const BASE_MODEL = 'BaseModel.js';

const MODELS = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file !== BASE_MODEL &&
      file.slice(-3) === '.js'
    );
  })
  .reduce((accum, file) => {
    accum[path.basename(file, '.js')] = require(path.join(__dirname, file));

    return accum;
  }, {});

module.exports = MODELS;
