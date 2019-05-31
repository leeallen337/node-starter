'use strict';

const express = require('express');
const Knex = require('knex');
const { Model } = require('objection');

const config = require('./config');
const knexfile = require('./knexfile');
const routesV1 = require('./routes/v1');

const app = express();
const knex = Knex(knexfile);

Model.knex(knex);

app.set('PORT', config.PORT);

app.use(express.json());
app.use('/v1', routesV1(app));

module.exports = app;
