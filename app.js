const express = require('express');
const Knex = require('knex');
const { Model } = require('objection');

const knexfile = require('./knexfile');
const routesV1 = require('./routes/v1');

const app = express();

const PORT = process.env.PORT || 3000;

const knex = Knex(knexfile);

Model.knex(knex);

app.use('/v1', routesV1(app));

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
