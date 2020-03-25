"use strict";

import express from "express";

import users from "./users";

export default (app) => {
  const router = express.Router({ mergeParams: true });

  users(app, router);

  return router;
};
