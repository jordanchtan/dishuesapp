exports.up = function(knex, Promise) {
    return knex.schema
      .createTable('restaurant', (table) => {
        table.increments('id').primary();
      })
      .createTable('dish', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
        table.string('imageUrl');
      });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('dish')
    .dropTable('restaurant');
};
