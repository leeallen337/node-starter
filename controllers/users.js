const { User } = require('../models');

function collection(req, res, next) {
  User.query().then((results) => {
    res.status(200).send(results);
  });
}

module.exports = {
  collection
};
