
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id');
      table.string('description');
      table.date('date_achieved');
      table.integer('famous_person_id')
      table
        .foreign('famous_person_id')
        .references('id')
        .on('famous_people')
        .onDelete('cascade');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
