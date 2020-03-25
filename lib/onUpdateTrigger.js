"use strict";

/**
 * https://stackoverflow.com/questions/36728899/knex-js-auto-update-trigger
 */

function onUpdateTrigger(table) {
  return `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `;
}

module.exports = onUpdateTrigger;
