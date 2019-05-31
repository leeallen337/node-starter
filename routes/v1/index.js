'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

module.exports = function(app) {
  const router = express.Router();
  const routes = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  });

  routes.forEach((route) => {
    require(path.join(__dirname, route))(app, router);
  });

  return router;
};
