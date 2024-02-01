// build your `Task` model here
const db = require('../../data/dbConfig')

function getAllTasks() {
   return db('tasks')
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