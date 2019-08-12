
exports.up = function(knex) {
  
};

exports.down = function(knex) {
  
};
//example
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('papers', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('author');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('footnotes', function(table) {
      table.increments('id').primary();
      table.string('note');
      table.integer('paper_id').unsigned()
      table.foreign('paper_id')
        .references('papers.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('footnotes'),
    knex.schema.dropTable('papers')
  ]);
};
//example
exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('projects', table => {
			table.increments('id').primary();
			table.string('name');
			table.timestamps(true, true);
		}),
		knex.schema.createTable('palettes', table => {
			table.increments('id').primary();
			table.integer('project_id').unsigned();
			table.foreign('project_id').references('projects.id');
			table.string('name');
			table.string('color_1');
			table.string('color_2');
			table.string('color_3');
			table.string('color_4');
			table.string('color_5');
			table.timestamps(true, true);
		})
	]);
};

exports.down = function(knex) {
	return Promise.all([knex.schema.dropTable('palettes'), knex.schema.dropTable('projects')]);
};
