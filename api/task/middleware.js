const Task = require('./model')

async function validateTask (req, res, next) {
    const { project_id, task_description } = req.body
    try {
        const projIds = await Task.getProjectIds()
        console.log(projIds)

            if(!projIds.some(id => id === project_id)) {
                    res.status(404).json({
                        message: 'Invalid Project ID'
                    })
                }
     

         if (!task_description) {
            return res.status(400).json({ error: 'Task description is required' });
        }
    
        if (!project_id) {
            return res.status(400).json({ error: 'Project id is required' });
        } 

        next()

    } catch(err) {
        next(err)
    }
}


module.exports = {
    validateTask
}