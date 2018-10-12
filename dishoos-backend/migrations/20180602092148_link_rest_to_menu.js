exports.up = function(knex) {
  return knex.schema.table('dish', (t) => {
     t.integer('restaurantId').unsigned();
     t.foreign('restaurantId').references('restaurant.id');

  });
};

exports.down = function(knex) {
    return knex.schema.table('dish', (t) =>  {
      t.dropForeign('restaurantId');
  });
};
