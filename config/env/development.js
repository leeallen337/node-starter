'use strict';

const path = require('path');

module.exports = {
  database: {
    client: 'postgres',

    connection: process.env.POSTGRES_CONNECTION,

    migrations: {
      directory: path.join(__dirname, '..', '..', 'db', 'migrations')
    }
  }
};
