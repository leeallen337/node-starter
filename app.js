"use strict";

const express = require("express");
const helmet = require("helmet");
const Knex = require("knex");
const { Model } = require("objection");

const config = require("./config");
const knexfile = require("./knexfile");
const { handleErrors } = require("./middlewares");
const routesV1 = require("./routes/v1");

const app = express();
const knex = Knex(knexfile);

Model.knex(knex);

app.set("PORT", config.PORT);

app.use(helmet());
app.use(express.json());

app.use("/v1", routesV1(app));
app.use(handleErrors);

module.exports = app;
