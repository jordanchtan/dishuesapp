
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('reviews', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.decimal('rating');
      table.string('review');
      table.string('imageurl');
      table.string('username');
      table.integer('dishid').unsigned();
      table.foreign('dishid').references('dish.id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('reviews');
};
