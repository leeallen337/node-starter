"use strict";

import { Model, QueryBuilder } from "objection";

import { PAGINATION_PAGE_INDEX, PAGINATION_SIZE } from "../lib/constants";

class BaseQueries extends QueryBuilder {
  getAllPaginatedResults(params) {
    const pageIndex = params?.page ?? PAGINATION_PAGE_INDEX;
    const size = params?.size ?? PAGINATION_SIZE;

    return this.page(pageIndex, size);
  }
}

class BaseModel extends Model {
  async $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export { BaseModel, BaseQueries };
