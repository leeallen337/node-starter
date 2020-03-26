"use strict";

import { expect } from "chai";
import faker from "faker";
import _ from "lodash";
import request from "supertest";

import app from "../../src/app";
import factory from "../fixtures/factory";
import { User } from "../../src/models";

describe("users", function () {
  afterEach(function () {
    return User.query().truncate();
  });

  describe("GET /users", function () {
    let users;

    beforeEach(async function () {
      users = _.times(faker.random.number({ min: 1500, max: 2500 }), () => {
        return User.fromJson(
          { ...factory.user.build(null, { withId: true }) },
          { skipValidation: true }
        );
      });

      await User.query().insert(users);
    });

    it("should return a list of all users", async function () {
      await request(app)
        .get("/v1/users")
        .type("application/json")
        .send()
        .expect(200)
        .then((res) => {
          expect(res.body)
            .to.be.an("object")
            .and.to.have.all.keys(["results", "total"]);

          expect(res.body.total).to.equal(users.length);
          expect(res.body.results).to.be.an("array").and.to.have.lengthOf(1000);
        });
    });

    context("when passing query parameters for pagination", function () {
      let size;
      let page;

      beforeEach(function () {
        size = faker.random.number({ min: 50, max: 75 });
        page = faker.random.number({ min: 0, max: 1 });
      });

      context("when a page is specified", function () {
        it("should return the specified page of results with a page size of 1000", function () {
          return request(app)
            .get("/v1/users")
            .query({ page })
            .type("application/json")
            .expect(200)
            .then((res) => {
              expect(res.body)
                .to.be.an("object")
                .and.to.have.all.keys(["results", "total"]);

              expect(res.body.total).to.equal(users.length);
              expect(res.body.results)
                .to.be.an("array")
                .and.to.have.lengthOf(1000);
            });
        });
      });

      context("when a size is specified", function () {
        it("should return the first page of results with the specified page size", function () {
          return request(app)
            .get("/v1/users")
            .query({ size })
            .type("application/json")
            .expect(200)
            .then((res) => {
              expect(res.body)
                .to.be.an("object")
                .and.have.all.keys(["results", "total"]);

              expect(res.body.total).to.equal(users.length);
              expect(res.body.results)
                .to.be.an("array")
                .and.to.have.lengthOf(size);
            });
        });
      });

      context("when both a page and a size are specified", function () {
        it("should return the specified page of results with the specified page size", function () {
          return request(app)
            .get("/v1/users")
            .query({ size, page })
            .type("application/json")
            .expect(200)
            .then((res) => {
              expect(res.body)
                .to.be.an("object")
                .and.have.all.keys(["results", "total"]);

              expect(res.body.total).to.equal(users.length);
              expect(res.body.results)
                .to.be.an("array")
                .and.to.have.lengthOf(size);
            });
        });
      });
    });
  });

  describe("GET /users/:userId", function () {
    let user;

    beforeEach(async function () {
      user = User.fromJson(
        { ...factory.user.build(null, { withId: true }) },
        { skipValidation: true }
      );

      await User.query().insert(user);
    });

    it("should throw an error if the user does not exist", async function () {
      await request(app)
        .get(`/v1/users/${faker.random.uuid()}`)
        .type("application/json")
        .expect(404)
        .then((res) => {
          expect(res.body).to.deep.equal({
            message: "NotFoundError",
            type: "NotFound",
            data: {},
          });
        });
    });

    it("should return the user", async function () {
      await request(app)
        .get(`/v1/users/${user.id}`)
        .type("application/json")
        .expect(200)
        .then((res) => {
          expect(res.body).to.include(user);
        });
    });
  });

  describe("DELETE /users/:userId", function () {
    let user;

    beforeEach(async function () {
      user = User.fromJson(
        { ...factory.user.build(null, { withId: true }) },
        { skipValidation: true }
      );

      await User.query().insert(user);
    });

    it("should throw an error if the user does not exist", async function () {
      await request(app)
        .del(`/v1/users/${faker.random.uuid()}`)
        .type("application/json")
        .send()
        .expect(404)
        .then((res) => {
          expect(res.body).to.deep.equal({
            message: "NotFoundError",
            type: "NotFound",
            data: {},
          });
        });
    });

    it("should delete the user from the database", async function () {
      await request(app)
        .del(`/v1/users/${user.id}`)
        .type("application/json")
        .send()
        .expect(204)
        .then((res) => {
          expect(res.body).to.be.an("object").and.to.be.empty();
        })
        .then(() => {
          return User.query()
            .findById(user.id)
            .then((result) => {
              expect(result).to.be.undefined();
            });
        });
    });
  });

  describe("PATCH /users/:userId", function () {
    let user;
    let updatedFirstName;

    beforeEach(async function () {
      user = User.fromJson(
        { ...factory.user.build(null, { withId: true }) },
        { skipValidation: true }
      );

      updatedFirstName = faker.name.firstName();

      await User.query().insert(user);
    });

    it("should throw an error if the user does not exist", async function () {
      await request(app)
        .del(`/v1/users/${faker.random.uuid()}`)
        .type("application/json")
        .expect(404)
        .then((res) => {
          expect(res.body).to.deep.equal({
            message: "NotFoundError",
            type: "NotFound",
            data: {},
          });
        });
    });

    it("should update the user", async function () {
      await request(app)
        .patch(`/v1/users/${user.id}`)
        .type("application/json")
        .send({ firstName: updatedFirstName })
        .expect(204)
        .then((res) => {
          expect(res.body).to.be.an("object").and.to.be.empty();
        })
        .then(() => {
          return User.query()
            .findById(user.id)
            .then((result) => {
              expect(result.firstName).to.equal(updatedFirstName);
            });
        });
    });
  });

  describe("POST /users", function () {
    let user;

    beforeEach(function () {
      user = factory.user.build();
    });

    it("should create a user", async function () {
      await request(app)
        .post("/v1/users")
        .type("application/json")
        .send(user)
        .expect(201)
        .then((res) => {
          expect(res.body).to.include(user);
        })
        .then(() => {
          return User.query()
            .findOne({
              firstName: user.firstName,
              lastName: user.lastName,
            })
            .then((result) => {
              expect(result).to.not.be.null();
            });
        });
    });
  });
});
