"use strict";

import debug from "debug";
import http from "http";

import app from "./app";

const debugApi = debug("api:server");

http.createServer(app).listen(3000, () => {
  debugApi(`Express server listening on port: ${3000}`);
});
