// build your `/api/tasks` router here
// build your `/api/projects` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/', (req, res, next) => {
    
})

router.post('/', (req, res, next) => {

})

router.use((err, req, res, next) => {
    res.status(500).json({
        custMsg: 'something went wrong inside task router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router