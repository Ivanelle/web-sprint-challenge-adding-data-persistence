// build your `Task` model here
const db = require('../../data/dbConfig')

function getAllTasks() {
   return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select(
        't.task_id',
        't.task_description',
        't.task_notes',
        't.task_completed',
        'p.project_name',
        'p.project_description'
    )
        .then(tasks => {
            const convertedTask = tasks.map(task => ({
                ...task, 
                task_completed: Boolean(task.task_completed)
            }))
            return convertedTask
        })
}

module.exports = {
    getAllTasks
}