const Project = require('./model')

function validatePayload (req, res, next) {
    const { project_name, project_completed } = req.body

    try {
        if(!project_name || project_name === undefined) {
            res.status(400).json({
                message: 'Project name is required'
            })
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
    }


module.exports = {
    validatePayload
}