'use strict';

const expect = require('chai').expect;
const faker = require('faker');
const request = require('supertest');

const app = require('../../app');
const factory = require('../fixtures/factory');
const models = require('../../models');

describe('users', function() {
  afterEach(function() {
    return models.User.query().truncate();
  });

  describe('GET /users', function() {
    let users;

    beforeEach(function() {
      users = factory.buildList(
        'user',
        faker.random.number({ min: 5, max: 10 })
      );

      return Promise.all(
        users.map((user) => {
          return models.User.query().insert({ ...user });
        })
      );
    });

    it('should return a list of all users', function() {
      return request(app)
        .get('/v1/users')
        .type('application/json')
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(users.length);
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
          return models.User.query()
            .where('firstName', user.firstName)
            .where('lastName', user.lastName)
            .then((result) => {
              expect(result.length).to.equal(1);
            });
        });
    });
  });
});
