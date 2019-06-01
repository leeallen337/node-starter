'use strict';

const { QueryBuilder } = require('objection');

const BaseModel = require('./BaseModel');

class UserQueries extends QueryBuilder {
  getAllPaginated(config = {}) {
    const { size = 100, page = 0 } = config;

    return this.select().page(page, size);
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
