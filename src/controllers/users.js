"use strict";

const { User } = require("../models");

async function collection(req, res, next) {
  const { page, size } = req.query;

  try {
    const users = await User.query().getAllUsers({ page, size });

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  const { firstName, lastName } = req.body;

  try {
    const user = await User.query().createUser({ firstName, lastName });

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  const { userId } = req.params;

  try {
    await User.query().deleteUser({ userId });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function retrieve(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.query().findUser({ userId });

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;

  try {
    await User.query().updateUser({ userId, firstName, lastName });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export default {
  collection,
  create,
  remove,
  retrieve,
  update,
};
