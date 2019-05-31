const users = require('../../controllers/users');

module.exports = function(app, router) {
  router.get('/users', users.collection);
};
