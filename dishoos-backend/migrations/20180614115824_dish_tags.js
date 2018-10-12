exports.up = function(knex, Promise) {
  return knex.schema.table('dish', (t) => {
     t.string('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dish', (t) =>  {
    t.dropColumn('tags');
});
};
