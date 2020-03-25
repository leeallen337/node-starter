"use strict";

const faker = require("faker");
const _ = require("lodash");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      const users = _.times(faker.random.number({ min: 50, max: 100 }), () => {
        return {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        };
      });

      return knex("users").insert(users);
    });
};
