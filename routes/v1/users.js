'use strict';

const { users } = require('../../controllers');

module.exports = function(app, router) {
  router.get('/users', users.collection);

  router.post('/users', users.create);

  router.delete('/users/:userId', users.remove);
};
