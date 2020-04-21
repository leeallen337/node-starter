"use strict";

import { users } from "../../controllers";

export default (app, router) => {
  router.get("/users", users.collection);

  router.post("/users", users.create);

  router.delete("/users/:userId", users.remove);

  router.get("/users/:userId", users.retrieve);

  router.patch("/users/:userId", users.update);
};
