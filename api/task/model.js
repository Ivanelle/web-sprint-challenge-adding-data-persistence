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

async function getProjectIds() {
    const projects = await db('projects').select('project_id')

    return projects.map(project => project.project_id)
}

async function addTask(task) {
    
    const [newTask] = await db('tasks')
        .insert(task)
        .returning([
            'task_id',
            'task_description',
            'task_notes',
            'task_completed',
            'project_id'
        ])

    newTask.task_completed = Boolean(newTask.task_completed)


        return newTask
}

module.exports = {
    getAllTasks,
    getProjectIds,
    addTask
}