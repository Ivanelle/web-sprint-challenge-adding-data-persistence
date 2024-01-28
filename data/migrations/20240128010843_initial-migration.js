/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema 
    .createTable('projects', table => {
        table.increments('project_id')
        table.string('project_name', 128)
            .notNullable()
        table.string('project_description', 256)
        table.boolean('project_completed')
            .defaultTo(0)
    })

    .createTable('resources', table => {
        table.increments('resource_id')
    })
    .createTable('tasks', table => {
        table.increments('task_id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists()
        .dropTableIfExists()
        .dropTableIfExists()
  
};
