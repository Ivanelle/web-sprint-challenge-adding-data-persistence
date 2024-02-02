

async function validateTask (req, res, next) {
    const { project_id, task_description } = req.body
    try {
        
        if (!task_description) {
            return res.status(400).json({ error: 'Task description is required' });
        }
    
        if (!project_id) {
            return res.status(400).json({ error: 'Project id is required' });
        }

    } catch(err) {
        next(err)
    }

}


module.exports = {
    validateTask
}