'use strict';

const path = require('path');

module.exports = {
  database: {
    client: 'postgres',

    connection: process.env.TEST_POSTGRES_CONNECTION,

    migrations: {
      directory: path.join(__dirname, '..', '..', 'db', 'migrations')
    },

    seeds: {
      directory: path.join(__dirname, '..', '..', 'db', 'seeds')
    }
  }
};
