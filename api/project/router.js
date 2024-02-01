// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')
const { 
    validatePayload
 } = require('./middleware')

router.get('/', (req, res, next) => {
    Project.getProjects()
        .then(projects => {

            res.status(200).json(projects)
        })
        .catch(next)
})

router.post('/', validatePayload, async (req, res, next) => {
    const {
        project_name,
        project_description,
        project_completed
    } = req.body

 try {
    const newProject = await Project.addProject({
        project_name,
        project_description,
        project_completed
    })
     res.status(201).json(newProject)

 } catch(err) {
    next(err)
 }
})

router.use((err, req, res, next) => {
    res.status(500).json({
        custMsg: 'something went wrong inside projects router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router