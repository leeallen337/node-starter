"use strict";

const factory = require("rosie").Factory;
const faker = require("faker");

factory
  .define("user")
  .option("withId", false)
  .attrs({
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
  })
  .attr("id", ["withId"], (withId) => {
    return withId ? faker.random.uuid() : undefined;
  })
  .after((user, options) => {
    if (!options.withId) {
      delete user.id;
    }
  });
