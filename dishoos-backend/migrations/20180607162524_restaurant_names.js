
exports.up = function(knex, Promise) {
  return knex.schema.table('restaurant', (t) => {
     t.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('restaurant', (t) =>  {
    t.dropColumn('name');
});
};
