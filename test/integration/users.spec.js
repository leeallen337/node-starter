'use strict';

const expect = require('chai').expect;
const faker = require('faker');
const request = require('supertest');

const app = require('../../app');
const factory = require('../fixtures/factory');
const { User } = require('../../models');

describe('users', function() {
  afterEach(function() {
    return User.query().truncate();
  });

  describe('GET /users', function() {
    let users;

    beforeEach(function() {
      users = factory.buildList(
        'user',
        faker.random.number({ min: 350, max: 550 })
      );

      return Promise.all(
        users.map((user) => {
          return User.query().insert({ ...user });
        })
      );
    });

    it('should return a list of all users', function() {
      return request(app)
        .get('/v1/users')
        .type('application/json')
        .expect(200)
        .then((res) => {
          expect(res.body)
            .to.be.an('object')
            .and.have.all.keys(['results', 'total']);

          expect(res.body.total).to.equal(users.length);
          expect(res.body.results).to.have.lengthOf(100);
        });
    });

    context('when passing query parameters for pagination', function() {
      let size;
      let page;

      beforeEach(function() {
        size = faker.random.number({ min: 50, max: 75 });
        page = faker.random.number({ min: 0, max: 2 });
      });

      context('when a page is specified', function() {
        it('should return the specified page of results with a page size of 100', function() {
          return request(app)
            .get('/v1/users')
            .query({ page })
            .type('application/json')
            .expect(200)
            .then((res) => {
              expect(res.body)
                .to.be.an('object')
                .and.have.all.keys(['results', 'total']);

              expect(res.body.total).to.equal(users.length);
              expect(res.body.results).to.have.lengthOf(100);

              return res.body.results;
            })
            .then((responseResults) => {
              return User.query().then((results) => {
                const offset = page * 100;
                const section = results.slice(offset, offset + 100);

                responseResults.forEach((item, index) => {
                  expect(item.firstName).to.equal(section[index].firstName);
                  expect(item.lastName).to.equal(section[index].lastName);
                });
              });
            });
        });
      });

      context('when a size is specified', function() {
        it('should return the first page of results with the specified page size', function() {
          return request(app)
            .get('/v1/users')
            .query({ size })
            .type('application/json')
            .expect(200)
            .then((res) => {
              expect(res.body)
                .to.be.an('object')
                .and.have.all.keys(['results', 'total']);

              expect(res.body.total).to.equal(users.length);
              expect(res.body.results).to.have.lengthOf(size);

              return res.body.results;
            })
            .then((responseResults) => {
              return User.query().then((results) => {
                const section = results.slice(0, size);

                responseResults.forEach((item, index) => {
                  expect(item.firstName).to.equal(section[index].firstName);
                  expect(item.lastName).to.equal(section[index].lastName);
                });
              });
            });
        });
      });

      context('when both a page and a size are specified', function() {
        it('should return the specified page of results with the specified page size', function() {
          return request(app)
            .get('/v1/users')
            .query({ size, page })
            .type('application/json')
            .expect(200)
            .then((res) => {
              expect(res.body)
                .to.be.an('object')
                .and.have.all.keys(['results', 'total']);

              expect(res.body.total).to.equal(users.length);
              expect(res.body.results).to.have.lengthOf(size);

              return res.body.results;
            })
            .then((responseResults) => {
              return User.query().then((results) => {
                const offset = page * size;
                const section = results.slice(offset, offset + size);

                responseResults.forEach((item, index) => {
                  expect(item.firstName).to.equal(section[index].firstName);
                  expect(item.lastName).to.equal(section[index].lastName);
                });
              });
            });
        });
      });
    });
  });

  describe('DELETE /users/:userId', function() {
    let user;

    beforeEach(function() {
      user = factory.build('user', null, { withId: true });

      return User.query().insert({ ...user });
    });

    it('should throw an error if the user does not exist', function() {
      return request(app)
        .del(`/v1/users/${faker.random.uuid()}`)
        .type('application/json')
        .expect(404)
        .then((res) => {
          expect(res.body).to.deep.equal({
            message: 'NotFoundError',
            type: 'NotFound',
            data: {}
          });
        });
    });

    it('should delete the user from the database', function() {
      return request(app)
        .del(`/v1/users/${user.id}`)
        .type('application/json')
        .expect(204)
        .then((res) => {
          expect(res.body).to.be.empty;
        })
        .then(() => {
          return User.query()
            .findById(user.id)
            .then((result) => {
              expect(result).to.be.empty;
            });
        });
    });
  });

  describe('POST /users', function() {
    let user;

    beforeEach(function() {
      user = factory.build('user');
    });

    it('should create a user', function() {
      return request(app)
        .post('/v1/users')
        .type('application/json')
        .send(user)
        .expect(201)
        .then((res) => {
          expect(res.body).to.include(user);
        })
        .then(() => {
          return User.query()
            .findOne({
              firstName: user.firstName,
              lastName: user.lastName
            })
            .then((result) => {
              expect(result).to.not.be.null();
            });
        });
    });
  });
});
