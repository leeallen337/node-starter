"use strict";

module.exports = {
  exit: true,
  file: "./test/support/setup.js",
  opts: false,
  reporter: "spec",
  require: ["@babel/register", "./test/support/addons.js"],
  timeout: 60000,
};
