
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('books', function(table){
        table.increments('id').primary();
        table.string('title');
        table.string('author');
        table.integer('year_published');
        table.string('genre');

        table.timestamps(true, true);
    }),
    knex.schema.createTable('reviews', function(table){
        table.increments('id').primary();
        table.string('review');
        table.integer('stars');
        table.foreign('book_id').references('books.id');

        table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('books'),
    knex.schema.dropTable('reviews')
  ])
};
