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

router.post('/', validateTask, (req, res, next) => {

})

router.use((err, req, res, next) => {
    res.status(500).json({
        custMsg: 'something went wrong inside task router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router