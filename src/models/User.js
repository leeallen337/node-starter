"use strict";

const { BaseModel, BaseQueries } = require("./BaseModelAndQueries");

class UserQueries extends BaseQueries {
  createUser(config) {
    const { firstName, lastName } = config;

    return this.insert({
      firstName,
      lastName,
    }).returning("*");
  }

  deleteUser(config) {
    const { userId } = config;

    return this.findUser({ userId }).delete();
  }

  findUser(config) {
    const { userId } = config;

    return this.findOne({ id: userId }).throwIfNotFound();
  }

  findAllUsers(config) {
    const { page, size } = config;

    return this.getAllPaginatedResults({ page, size });
  }

  updateUser(config) {
    const { firstName, lastName, userId } = config;

    return this.findUser({ userId }).patch({
      firstName,
      lastName,
    });
  }
}

class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      additionalProperties: false,
      required: ["firstName", "lastName"],
      properties: {
        firstName: { type: "string", minLength: 1 },
        lastName: { type: "string", minLength: 1 },
      },
    };
  }

  static get QueryBuilder() {
    return UserQueries;
  }
}

export default User;
