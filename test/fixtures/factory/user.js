"use strict";

import faker from "faker";
import { Factory } from "rosie";

export default new Factory()
  .option("withId", false)
  .attrs({
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
  })
  .attr("id", ["withId"], (withId) => {
    return withId ? faker.random.uuid() : undefined;
  })
  .after((user) => {
    if (!user.id) {
      delete user.id;
    }
  });
