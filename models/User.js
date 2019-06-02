'use strict';

const { QueryBuilder } = require('objection');

const BaseModel = require('./BaseModel');
const { PAGINATION_PAGE_INDEX, PAGINATION_SIZE } = require('../lib/constants');

class UserQueries extends QueryBuilder {
  _getAllPaginated(config = {}) {
    const { page = PAGINATION_PAGE_INDEX, size = PAGINATION_SIZE } = config;

    return this.page(page, size);
  }

  _findById(config) {
    const { params } = config;

    return this.findById(params.userId).throwIfNotFound();
  }

  _findByIdAndDelete(config) {
    const { params } = config;

    return this.findById(params.userId)
      .throwIfNotFound()
      .deleteById(params.userId);
  }

  _findByIdAndPatch(config) {
    const { body, params } = config;

    return this.findById(params.userId)
      .throwIfNotFound()
      .patch(body);
  }
}

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['firstName', 'lastName'],
      properties: {
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 }
      }
    };
  }

  static get QueryBuilder() {
    return UserQueries;
  }
}

module.exports = User;
