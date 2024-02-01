// build your `Resource` model here
const db = require('../../data/dbConfig')

function getAllResources() {
    return db('resources')
}

function getResourceByName(resource_name) {
    return db('resources').where({ resource_name }).first()
}

async function addResource(newResource) {
    const { resource_name } = newResource

    try {

        const [addedResource] = await db('resources')
            .insert(newResource)
            .returning([
            'resource_id',
            'resource_name',
            'resource_description'
        ])

        return addedResource

    } catch (error) {
        console.error('Error adding resource', error)
    }
 
}

module.exports = {
    getAllResources,
    getResourceByName,
    addResource
}