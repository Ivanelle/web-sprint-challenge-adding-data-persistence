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

async function addTask(task) {
    try {
        const [newTask] = await db('tasks')
            .insert(task)
            .returning('*')
        
        const isValidProjectId = await db('projects')
            .where('project_id', newTask.project_id)
            .first()

        if(!isValidProjectId) {
            await db('tasks')
                .where('task_id', newTask.task_id)
                throw new Error('Invalid project id')
        }

        const [project] = await db('projects')
            .select(
                'project_name',
                'project_description'
            )
            .where('project_id', newTask.project_id)

            newTask.project_name = project.project_name
            newTask.project_description = project.project_description
            newTask.task_completed = Boolean(newTask.task_completed)

            return newTask
            
    } catch(err) {
        console.error('Error adding task:', err)
    }
}

module.exports = {
    getAllTasks,
    addTask
}