'use strict';

const { User } = require('../models');

function collection(req, res, next) {
  const config = {
    query: req.query
  };

  User.query()
    ._getAllPaginated(config.query)
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

function remove(req, res, next) {
  const config = {
    params: req.params
  };

  User.query()
    ._findByIdAndDelete(config)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

function retrieve(req, res, next) {
  const config = {
    params: req.params
  };

  User.query()
    ._findById(config)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
}

function patch(req, res, next) {
  const config = {
    body: req.body,
    params: req.params
  };

  User.query()
    ._findByIdAndPatch(config)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  collection,
  create,
  remove,
  retrieve,
  patch
};
