const { User } = require('../models');

function collection(req, res, next) {
  User.query()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      next(err);
    });
}

function create(req, res, next) {
  const config = {
    body: req.body
  };

  User.query()
    .insert({ ...config.body })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  collection,
  create
};
