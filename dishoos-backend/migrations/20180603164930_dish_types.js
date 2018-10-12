
exports.up = function(knex, Promise) {
  return knex.schema.table('dish', (t) => {
    // one of (MAIN, DESSERT, STARTER, DRINK)
     t.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dish', (t) =>  {
    t.dropColumn('type');
});
};
