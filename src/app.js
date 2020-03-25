"use strict";

import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import Knex from "knex";
import morgan from "morgan";
import { Model } from "objection";

import knexfile from "../knexfile";
import { handleErrors } from "./middlewares";
import routesV1 from "./routes/v1";

const knex = Knex(knexfile);
Model.knex(knex);

const app = express();

const debugMorgan = debug("morgan:http");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("dev", {
    skip: () => config.env === "test",
    stream: {
      write: (msg) => debugMorgan(msg.trimEnd()),
    },
  })
);
app.use(
  cors({
    allowedHeaders: [
      "Accept",
      "Authorization",
      "Content-Type",
      "Origin",
      "X-Requested-With",
    ],
    methods: ["DELETE", "GET", "PATCH", "POST", "PUT"],
    origin: "*",
  })
);

app.use("/v1", routesV1(app));

app.use(handleErrors);

export default app;
