const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.POSTGRES_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "..", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "..", "db", "seeds"),
    },
  },

  test: {
    client: "pg",
    connection: process.env.TEST_POSGRESS_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "..", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "..", "db", "seeds"),
    },
  },

  production: {
    client: "pg",
    connection: process.env.POSTGRES_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "..", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "..", "db", "seeds"),
    },
  },
};
