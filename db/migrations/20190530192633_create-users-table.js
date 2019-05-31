const onUpdateTrigger = require('../../lib/onUpdateTrigger');

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger('users')));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
