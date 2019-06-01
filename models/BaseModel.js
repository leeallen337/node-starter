'use strict';

const objection = require('objection');
const { Model } = require('objection');

class BaseModel extends Model {
  $beforeInsert() {
    if (this.createdAt || this.updatedAt) {
      throw new objection.ValidationError({
        message: 'createdAt and updatedAt are invalid fields',
        type: 'DateError',
        data: {}
      });
    }
  }

  $beforeUpdate() {
    if (this.createdAt || this.updatedAt) {
      throw new objection.ValidationError({
        message: 'createdAt and updatedAt are invalid fields',
        type: 'DateError',
        data: {}
      });
    }
  }
}

module.exports = BaseModel;
