'use strict';

const { QueryBuilder } = require('objection');

const BaseModel = require('./BaseModel');
const { PAGINATION_PAGE_INDEX, PAGINATION_SIZE } = require('../lib/constants');

class UserQueries extends QueryBuilder {
  _getAllPaginated(config = {}) {
    const { page = PAGINATION_PAGE_INDEX, size = PAGINATION_SIZE } = config;

    return this.page(page, size);
  }

  _findById(userId) {
    return this.findById(userId).throwIfNotFound();
  }

  _findByIdAndDelete(userId) {
    return this.findById(userId)
      .throwIfNotFound()
      .deleteById(userId);
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
