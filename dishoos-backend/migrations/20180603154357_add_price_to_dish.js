
exports.up = function(knex, Promise) {
  return knex.schema.table('dish', (t) => {
     t.decimal('price', 8, 2);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dish', (t) =>  {
    t.dropColumn('price');
});
};
