
exports.up = function(knex, Promise) {
    return knex.schema
      .createTable('facebook', (table) => {
        table.increments('id').primary();
        table.string('userId');
        table.string('name');
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('facebook')
};
