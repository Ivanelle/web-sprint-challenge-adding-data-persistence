// build your `/api/tasks` router here

const router = require('express').Router()
const Task = require('./model')
const { validateTask } = require('./middleware')

router.get('/', (req, res, next) => {
    Task.getAllTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
})

router.post('/', validateTask, async (req, res, next) => {
    const {
        task_id,
        task_description, 
        task_notes, 
        task_completed,
        project_id
    } = req.body

    try {
        const newTask = await Task.addTask({
            task_id,
            task_description,
            task_notes,
            task_completed,
            project_id
        })
            res.status(201).json(newTask)
        next()

    } catch(err) {
        console.error('Error adding task', err)
        next()
    }
})


router.use((err, req, res, next) => {
    res.status(500).json({
        custMsg: 'something went wrong inside task router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router