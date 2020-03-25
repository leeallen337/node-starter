"use strict";

const http = require("http");

const app = require("./app");
const PORT = app.get("PORT");

http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`); // eslint-disable-line no-console
});
