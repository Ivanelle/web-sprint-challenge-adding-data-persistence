

async function validateTask (req, res, next) {
    const { project_id, task_description } = req.body
    try {
        if (!project_id || project_id === undefined ) {
            res.status(400).json({
                message: 'Needs a valid project id'
            })
        if (!task_description || task_description === undefined) {
            res.status(400).json({
                message: 'task description is required'
            })
        }
         else {
            next()
         }
        }

    } catch(err) {
        next(err)
    }

}

module.exports = {
    validateTask
}