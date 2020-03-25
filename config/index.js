require("dotenv").config();

const database = require("./database");

const env = process.env.NODE_ENV || "development";

module.exports = {
  env,
  database: {
    ...database[env],
  },
};
