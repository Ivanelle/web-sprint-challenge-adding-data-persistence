const Resource = require('./model')

async function validateResource(req, res , next) {
    const { resource_name } = req.body

    try {
        if (!resource_name || resource_name === undefined) {
            res.status(400).json({
                message: 'Resource name required'
            }) 
        } else {
            const existingResource = await Resource.getResourceByName(resource_name)
            if(existingResource) {
                res.status(400).json({
                    message: 'Resource name must be unique'
                })
            } else {
                next()
            }
        }

    } catch (err) {
        next(err)
    }

}


module.exports = {
    validateResource,
}