"use strict";

module.exports = {
  exit: true,
  file: "./test/bootstrap.js",
  opts: false,
  reporter: "spec",
  require: ["@babel/register", "./test/addons.js"],
  timeout: 60000,
};
